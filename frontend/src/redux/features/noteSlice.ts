import { Note } from '@/data/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type initialNoteStateType = {
  notes: Partial<Note>[]
}
const initialNoteState:initialNoteStateType = {
  notes: []
};

export const noteSlice = createSlice({
  name: 'note',
  initialState: initialNoteState,
  reducers: {
    resetNoteState: () => initialNoteState,
    deleteNoteState: (state, action: PayloadAction<{ id: number }>) => {
      const { payload } = action;
      const newState = {
        notes: state.notes.filter((note) => note.id !== payload.id)
      };
      return newState;
    },
    activeNoteState: (state, action: PayloadAction<{ id: number }>) => {
      const { payload } = action;
      const newNotes = state.notes.map((note) => {
        if (note.id !== payload.id) return note;
        else return { ...note,archived: false };
      });
      return { notes: newNotes};
    },
    archiveNoteState: (state, action: PayloadAction<{ id: number }>) => {
      const { payload } = action;
      const newNotes = state.notes.map((note) => {
        if (note.id !== payload.id) return note;
        else return { ...note,archived: true };
      });
      return { notes: newNotes};
    },
    setNotesState: (state, action: PayloadAction<Note[]>) => {
      const { payload } = action;
      return { notes: payload };
    },
    addNoteState: (state, action: PayloadAction<Partial<Note>>) => {
      const { payload } = action;
      return { notes: [...state.notes, payload] };
    },
    editNoteState: (state, action: PayloadAction<Partial<Note>>) => {
      const { payload } = action;
      const stateWithOutNote = {
        notes: state.notes.filter((note) => note.id !== payload.id)
      };
      return { notes: [...stateWithOutNote.notes, payload] };
    },
  },
});

export const { 
  resetNoteState, 
  deleteNoteState, 
  activeNoteState, 
  archiveNoteState, 
  setNotesState,
  addNoteState,
  editNoteState
} = noteSlice.actions;

export default noteSlice.reducer;
