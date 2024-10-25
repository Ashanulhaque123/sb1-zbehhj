import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import ThemeSelector from './components/ThemeSelector';
import Timer from './components/Timer';
import Notebook from './components/Notebook';
import AIReader from './components/AIReader';
import { Theme, Note } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (content: string) => {
    const newNote = {
      id: Date.now(),
      content,
      timestamp: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
  };

  const removeNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === 'light' 
        ? 'bg-lime-500 text-green-900' 
        : theme === 'yellow' 
          ? 'bg-yellow-100 text-red-600'
          : 'bg-gray-900 text-white'
    }`}>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-opacity-90 shadow-lg px-6 py-4 flex items-center justify-between animate-fadeIn">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 animate-pulse" />
          <h1 className="text-2xl font-bold animate-slideIn">FocusNotebook</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSelector currentTheme={theme} onThemeChange={setTheme} />
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-6xl animate-fadeIn">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Notebook 
              onAddNote={addNote}
              onRemoveNote={removeNote}
              notes={notes}
              theme={theme}
            />
          </div>
          <div className="space-y-6">
            <Timer theme={theme} />
            <AIReader theme={theme} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;