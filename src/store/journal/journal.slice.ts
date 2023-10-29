/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IJournalSliceState, INote } from '../interfaces';

const journalSliceName = 'journal';
const initialState: IJournalSliceState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
};

const journalSlice = createSlice({
  name: journalSliceName,
  initialState,
  reducers: {
    addNewEmptyNote: (state, { payload }: PayloadAction<INote>) => {
      state.notes.push(payload);
      state.isSaving = false;
    },
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    setActiveNote: (state, { payload }: PayloadAction<INote>) => {
      state.active = payload;
    },
    setNotes: (state, { payload }: PayloadAction<void>) => {},
    setSaving: (state) => {},
    updateNotes: (state, { payload }: PayloadAction) => {},
    DeleteNoteById: (state, { payload }: PayloadAction) => {},
  },
});

export const {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNotes,
  DeleteNoteById,
} = journalSlice.actions;

export const journalReducer = journalSlice.reducer;
