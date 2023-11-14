/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { IImagesUrls, IJournalSliceState, INote } from '../interfaces';
import { RootState } from '..';
import { Notes } from '@mui/icons-material';

const journalSliceName = 'journal';
const initialState: IJournalSliceState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
  error: null,
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
      state.error = null;
    },
    setNotes: (state, { payload }: PayloadAction<INote[]>) => {
      state.notes = payload;
      state.error = null;
    },
    setSaving: (state) => {
      state.error = null;
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
      state.error = null;
    },

    deleteNoteById: (state, { payload }: PayloadAction<{ id?: string }>) => {
      state.notes = state.notes.filter((note) => note.id !== payload.id);
      state.active = null;
    },
    clearNotes: () => {
      return initialState;
    },
    setError: (state, { payload }: PayloadAction<{ errorMessage: string }>) => {
      state.isSaving = false;
      state.error = payload.errorMessage;
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
  clearNotes,
  setError,
} = journalSlice.actions;

export const journalReducer = journalSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
export const selectJournal = (state: RootState) => state.journal;

export const selectSizeActiveImages = (state: RootState) => state.journal.active?.imagesUrls.length;

export const SelectNotesSorted = createSelector(selectJournal, (journal) => {
  const sortedNotes = structuredClone(journal.notes);
  return sortedNotes.sort((a, b) => {
    if (a.date > b.date) {
      return 1;
    }
    if (a.date < b.date) {
      return -1;
    }
    return 0;
  });
});
