
import React from 'react';
import { X } from 'lucide-react';
import { Note } from '../types/note';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onClick: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onClick }) => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      green: 'bg-green-50 border-green-200 hover:bg-green-100',
      yellow: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
      pink: 'bg-pink-50 border-pink-200 hover:bg-pink-100',
      purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      gray: 'bg-gray-50 border-gray-200 hover:bg-gray-100',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(note.id);
  };

  return (
    <div
      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-md group ${getColorClasses(note.color)}`}
      onClick={onClick}
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-full hover:bg-red-100"
        aria-label="Delete note"
      >
        <X className="w-4 h-4 text-red-500" />
      </button>

      {/* Note Content */}
      <div className="pr-8">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {note.title || 'Untitled Note'}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
          {note.content || 'No content'}
        </p>
        <div className="text-xs text-gray-400">
          {new Date(note.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
