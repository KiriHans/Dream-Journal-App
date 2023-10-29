import { PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { INote } from '../interfaces';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { firestore } from 'src/firebase/config';
import { addNewEmptyNote, savingNewNote } from '.';
import { noteConverter } from 'src/firebase/converters';

export const startNewNote = (): ThunkAction<void, RootState, unknown, PayloadAction<INote>> => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;
    const journalRef = collection(firestore, `users/${uid}/journal`);

    const newNote: INote = {
      title: '',
      body: '',
      date: Timestamp.now().toMillis(),
    };

    const docRef = (await addDoc(journalRef, newNote)).withConverter(noteConverter);
    newNote.id = docRef.id;

    dispatch(addNewEmptyNote(newNote));
  };
};
