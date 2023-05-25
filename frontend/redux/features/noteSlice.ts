import { Note } from "@/app/components";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialNoteState:Note[] = []

export const noteSlice = createSlice({
  name: "note",
  initialState: initialNoteState,
  reducers: {
    resetNote: () => initialNoteState,
    deleteNote: (state, action: PayloadAction<{id:number}>) => {
      const { payload } = action;
      const newState = state.filter( note => note.id !== payload.id)
      return newState
    },
    activeNote: (state, action: PayloadAction<{id:number}>) => {
      const { payload } = action;
      const newState = state.map( note => {
        if(note.id !== payload.id) return note
        else return { ...note, archived: false}
      })
      return newState
    },
    archiveNote: (state, action: PayloadAction<{id:number}>) => {
      const { payload } = action;
      const newState = state.map( note => {
        if(note.id !== payload.id) return note
        else return { ...note, archived: true}
      })
      return newState
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      const { payload } = action;
      return payload
    },
  }
});

export const {
  resetNote,
  deleteNote,
  activeNote,
  archiveNote,
  setNotes
} = noteSlice.actions;

export default noteSlice.reducer;
