
import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Note, NoteColor } from '../types/note';
import { useLocalStorage } from '../hooks/useLocalStorage';
import NoteCard from './NoteCard';
import AddNoteForm from './AddNoteForm';
import SearchBar from './SearchBar';

type Screen = 'home' | 'add' | 'edit';

const QuickNotes: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>('quicknotes', []);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [editingNote, setEditingNote] = useState<Note | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [colorFilter, setColorFilter] = useState<NoteColor | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  const filteredAndSortedNotes = useMemo(() => {
    let filtered = notes.filter((note) => {
      const matchesSearch = 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesColor = colorFilter === 'all' || note.color === colorFilter;
      return matchesSearch && matchesColor;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [notes, searchTerm, colorFilter, sortBy]);

  const handleSaveNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingNote) {
      // Update existing note
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === editingNote.id
            ? { ...note, ...noteData, updatedAt: new Date() }
            : note
        )
      );
      setEditingNote(undefined);
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        ...noteData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setNotes(prevNotes => [newNote, ...prevNotes]);
    }
    setCurrentScreen('home');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setCurrentScreen('edit');
  };

  const handleClearAllNotes = () => {
    if (window.confirm('Are you sure you want to delete all notes?')) {
      setNotes([]);
    }
  };

  const renderHomeScreen = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">QuickNotes</h1>
        <p className="text-gray-600">Capture your thoughts, organize your ideas</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          onClick={() => setCurrentScreen('add')}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Note
        </button>
        {notes.length > 0 && (
          <button
            onClick={handleClearAllNotes}
            className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Clear All Notes
          </button>
        )}
      </div>

      {/* Search and Filters */}
      {notes.length > 0 && (
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          colorFilter={colorFilter}
          onColorFilterChange={setColorFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      )}

      {/* Notes Display */}
      {filteredAndSortedNotes.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
            <Plus className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            {notes.length === 0 ? 'No notes yet' : 'No notes match your search'}
          </h3>
          <p className="text-gray-500">
            {notes.length === 0 
              ? 'Start by creating your first note'
              : 'Try adjusting your search or filters'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAndSortedNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDeleteNote}
              onClick={() => handleEditNote(note)}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderAddEditScreen = () => (
    <AddNoteForm
      onSave={handleSaveNote}
      onCancel={() => {
        setCurrentScreen('home');
        setEditingNote(undefined);
      }}
      editingNote={editingNote}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {currentScreen === 'home' && renderHomeScreen()}
        {(currentScreen === 'add' || currentScreen === 'edit') && renderAddEditScreen()}
      </div>
    </div>
  );
};

export default QuickNotes;
