import { PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { INote } from '../interfaces';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { firestore } from 'src/firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote } from '.';
import { noteConverter } from 'src/firebase/converters';

export const startNewNote = (): ThunkAction<void, RootState, unknown, PayloadAction<INote>> => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote({}));
    const { uid } = getState().auth;
    const journalRef = collection(firestore, `users/${uid}/journal`).withConverter(noteConverter);

    const newNote: INote = {
      title: '',
      body: '',
      date: Timestamp.now().toMillis(),
    };

    console.log('asas');
    const docRef = await addDoc(journalRef, newNote);
    newNote.id = docRef.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};
