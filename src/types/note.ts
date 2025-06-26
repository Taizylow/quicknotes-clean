
export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export type NoteColor = 'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'gray';
