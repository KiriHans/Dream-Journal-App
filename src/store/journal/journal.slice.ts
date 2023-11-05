/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IImagesUrls, IJournalSliceState, INote } from '../interfaces';

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
      state.messageSaved = ``;
    },
    setNotes: (state, { payload }: PayloadAction<INote[]>) => {
      state.notes = payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = ``;
    },
    updateNote: (state, { payload }: PayloadAction<INote>) => {
      state.isSaving = false;
      const foundIndex = state.notes.findIndex((x) => x.id === payload.id);
      state.notes[foundIndex] = payload;

      state.messageSaved = `${payload.title} updated!`;
    },
    setPhotosToActiveNote: (state, { payload }: PayloadAction<IImagesUrls[]>) => {
      const currentImagesUrls = state.active?.imagesUrls ?? [];
      if (state.active) {
        state.active.imagesUrls = [...currentImagesUrls, ...payload];
      }
    },
    deleteNoteById: (state, { payload }: PayloadAction<{ id?: string }>) => {
      state.notes = state.notes.filter((note) => note.id !== payload.id);
      state.active = null;
    },
  },
});

export const {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
  deleteNoteById,
} = journalSlice.actions;

export const journalReducer = journalSlice.reducer;
