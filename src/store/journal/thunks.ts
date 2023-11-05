import { PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IActive, IImagesUrls, INote } from '../interfaces';
import { Timestamp, addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from 'src/firebase/config';
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from '.';
import { noteConverter } from 'src/firebase/converters';
import { fileUpload, loadNotes } from 'src/helpers';
import { StorageError, UploadTaskSnapshot, getDownloadURL } from 'firebase/storage';

export const startNewNote = (): ThunkAction<
  void,
  RootState,
  unknown,
  PayloadAction<INote | void>
> => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;
    const journalRef = collection(firestore, `users/${uid}/journal`).withConverter(noteConverter);

    const newNote: INote = {
      title: '',
      body: '',
      date: Timestamp.now().toMillis(),
      id: '',
      imagesUrls: [],
    };

    const docRef = await addDoc(journalRef, newNote);
    newNote.id = docRef.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = (): ThunkAction<
  void,
  RootState,
  unknown,
  PayloadAction<INote[]>
> => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  };
};

export const startSaveNote = (): ThunkAction<
  void,
  RootState,
  unknown,
  PayloadAction<void | IActive | null>
> => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: activeNote } = getState().journal;
    if (!activeNote) return;

    dispatch(setSaving());

    const updatedNote: IActive = { ...activeNote, date: Timestamp.now().toMillis() };
    const docRef = doc(firestore, `users/${uid}/journal/${activeNote?.id}`).withConverter(
      noteConverter
    );
    await setDoc(docRef, updatedNote, { merge: true });

    dispatch(updateNote(updatedNote));
  };
};

export const startUploadingFiles = (
  files: FileList
): ThunkAction<void, RootState, unknown, PayloadAction<void | IActive | IImagesUrls[]>> => {
  return async (dispatch) => {
    const fileUploadPromises = [];
    let uploadTasksArray: UploadTaskSnapshot[] = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    try {
      uploadTasksArray = await Promise.all(fileUploadPromises);
    } catch (error) {
      if (error instanceof StorageError) {
        console.error(error);
      }
    }

    const photoUrls: IImagesUrls[] = [];

    for (const uploadTask of uploadTasksArray) {
      photoUrls.push({
        name: uploadTask.metadata.name,
        url: await getDownloadURL(uploadTask.ref),
      });
    }

    dispatch(setPhotosToActiveNote(photoUrls));
    dispatch(startSaveNote());
  };
};

export const startDeletingNote = (): ThunkAction<
  void,
  RootState,
  unknown,
  PayloadAction<{ id?: string }>
> => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: activeNote } = getState().journal;

    const docRef = doc(firestore, `users/${uid}/journal/${activeNote?.id}`).withConverter(
      noteConverter
    );

    await deleteDoc(docRef);

    dispatch(deleteNoteById({ id: activeNote?.id }));
  };
};
