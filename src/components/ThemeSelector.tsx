import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { Theme } from '../types';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onThemeChange('light')}
        className={`p-2 rounded-full transition-all ${
          currentTheme === 'light' ? 'bg-lime-600 text-white' : 'hover:bg-lime-100'
        }`}
      >
        <Sun className="w-5 h-5" />
      </button>
      <button
        onClick={() => onThemeChange('yellow')}
        className={`p-2 rounded-full transition-all ${
          currentTheme === 'yellow' ? 'bg-yellow-400 text-white' : 'hover:bg-yellow-100'
        }`}
      >
        <Palette className="w-5 h-5" />
      </button>
      <button
        onClick={() => onThemeChange('dark')}
        className={`p-2 rounded-full transition-all ${
          currentTheme === 'dark' ? 'bg-gray-700 text-white' : 'hover:bg-gray-100'
        }`}
      >
        <Moon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ThemeSelector;