
import React, { useState } from 'react';
import { Note, NoteColor } from '../types/note';

interface AddNoteFormProps {
  onSave: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  editingNote?: Note;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ onSave, onCancel, editingNote }) => {
  const [title, setTitle] = useState(editingNote?.title || '');
  const [content, setContent] = useState(editingNote?.content || '');
  const [color, setColor] = useState<NoteColor>(editingNote?.color as NoteColor || 'blue');

  const colors: { value: NoteColor; label: string; bgClass: string }[] = [
    { value: 'blue', label: 'Blue', bgClass: 'bg-blue-100' },
    { value: 'green', label: 'Green', bgClass: 'bg-green-100' },
    { value: 'yellow', label: 'Yellow', bgClass: 'bg-yellow-100' },
    { value: 'pink', label: 'Pink', bgClass: 'bg-pink-100' },
    { value: 'purple', label: 'Purple', bgClass: 'bg-purple-100' },
    { value: 'gray', label: 'Gray', bgClass: 'bg-gray-100' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() || content.trim()) {
      onSave({ title: title.trim(), content: content.trim(), color });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editingNote ? 'Edit Note' : 'Add New Note'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Note Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Content Textarea */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Note Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            rows={8}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Color Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note Color
          </label>
          <div className="flex flex-wrap gap-2">
            {colors.map((colorOption) => (
              <button
                key={colorOption.value}
                type="button"
                onClick={() => setColor(colorOption.value)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  color === colorOption.value
                    ? 'border-gray-400 ring-2 ring-blue-500'
                    : 'border-gray-200 hover:border-gray-300'
                } ${colorOption.bgClass}`}
              >
                {colorOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            {editingNote ? 'Update Note' : 'Save Note'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNoteForm;
