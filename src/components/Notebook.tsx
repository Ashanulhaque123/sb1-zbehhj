import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Theme, Note } from '../types';

interface NotebookProps {
  onAddNote: (content: string) => void;
  onRemoveNote: (id: number) => void;
  notes: Note[];
  theme: Theme;
}

const Notebook: React.FC<NotebookProps> = ({ onAddNote, onRemoveNote, notes, theme }) => {
  const [newNote, setNewNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote('');
    }
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

  return (
    <div className={`${getBgColor()} p-6 rounded-xl shadow-lg animate-slideIn`}>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your note here..."
          className={`w-full h-32 p-4 rounded-lg resize-none focus:outline-none focus:ring-2 ${
            theme === 'dark' 
              ? 'bg-gray-700 focus:ring-gray-600' 
              : 'bg-opacity-20 backdrop-blur-md focus:ring-white'
          }`}
        />
        <button
          type="submit"
          disabled={!newNote.trim()}
          className="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-opacity-20 backdrop-blur-md hover:bg-opacity-30 transition-all disabled:opacity-50"
        >
          <PlusCircle className="w-5 h-5" />
          Add Note
        </button>
      </form>

      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`p-4 rounded-lg ${
              theme === 'dark' 
                ? 'bg-gray-700' 
                : 'bg-opacity-20 backdrop-blur-md'
            }`}
          >
            <div className="flex justify-between items-start gap-4">
              <p className="whitespace-pre-wrap">{note.content}</p>
              <button
                onClick={() => onRemoveNote(note.id)}
                className="p-1 rounded hover:bg-opacity-20 backdrop-blur-md transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 text-sm opacity-60">
              {new Date(note.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notebook;