import React, { useState, useEffect } from 'react';
import { Volume2, Pause, Play, Globe } from 'lucide-react';
import { Theme } from '../types';

interface AIReaderProps {
  theme: Theme;
}

const AIReader: React.FC<AIReaderProps> = ({ theme }) => {
  const [text, setText] = useState('');
  const [isReading, setIsReading] = useState(false);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Try to find Bangla voice
      const banglaVoice = availableVoices.find(voice => 
        voice.lang.includes('bn') || // Bangla
        voice.lang.includes('bn-BD') || // Bangladesh
        voice.lang.includes('bn-IN') // Indian Bengali
      );
      
      if (banglaVoice) {
        setSelectedVoice(banglaVoice);
      } else {
        setSelectedVoice(availableVoices[0]);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const startReading = () => {
    if (text && !isReading) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = pitch;
      utterance.rate = rate;
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.onend = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
  };

  const getBgColor = () => {
    switch (theme) {
      case 'light':
        return 'bg-lime-600';
      case 'yellow':
        return 'bg-yellow-50';
      case 'dark':
        return 'bg-gray-800';
      default:
        return 'bg-white';
    }
  };

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voice = voices.find(v => v.name === e.target.value);
    if (voice) {
      setSelectedVoice(voice);
    }
  };

  return (
    <div className={`${getBgColor()} p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-102 animate-slideIn`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          AI Reader
        </h2>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <select
            value={selectedVoice?.name}
            onChange={handleVoiceChange}
            className={`text-sm rounded-lg ${
              theme === 'dark' 
                ? 'bg-gray-700' 
                : 'bg-opacity-20 backdrop-blur-md'
            } px-2 py-1 focus:outline-none`}
          >
            {voices.map(voice => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text for AI to read... (supports Bangla/বাংলা)"
          className={`w-full h-32 p-4 rounded-lg resize-none focus:outline-none focus:ring-2 ${
            theme === 'dark' 
              ? 'bg-gray-700 focus:ring-gray-600' 
              : 'bg-opacity-20 backdrop-blur-md focus:ring-white'
          }`}
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Pitch</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Speed</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        <button
          onClick={isReading ? stopReading : startReading}
          disabled={!text}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-opacity-20 backdrop-blur-md hover:bg-opacity-30 transition-all duration-300 disabled:opacity-50"
        >
          {isReading ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isReading ? 'Stop Reading' : 'Start Reading'}
        </button>
      </div>
    </div>
  );
};

export default AIReader;