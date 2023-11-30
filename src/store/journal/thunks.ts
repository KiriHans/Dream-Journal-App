import { PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IActive, IImagesUrls, IMessage, INote } from '../interfaces';
import { Timestamp, addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from 'src/firebase/config';
import {
  addNewEmptyNote,
  deleteImageByTitle,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setError,
  setLoading,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  stopLoading,
  updateNote,
} from '.';
import { noteConverter } from 'src/firebase/converters';
import { fileDelete, fileUpload, loadNotes } from 'src/helpers';
import { StorageError, UploadTaskSnapshot, getDownloadURL } from 'firebase/storage';
import { FirebaseError } from 'firebase/app';
import { setMessage } from '../UI/UI-slice';

export const startNewNote = ({
  title,
}: {
  title: string;
}): ThunkAction<
  void,
  RootState,
  unknown,
  PayloadAction<INote | { errorMessage: string } | void>
> => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;
    const journalRef = collection(firestore, `users/${uid}/journal`).withConverter(noteConverter);

    const newNote: INote = {
      title,
      body: '',
      date: Timestamp.now().toMillis(),
      id: '',
      imagesUrls: [],
    };

    try {
      const docRef = await addDoc(journalRef, newNote);
      newNote.id = docRef.id;
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error);
        const errorMessage = error.message;
        return dispatch(setError({ errorMessage }));
      }
    }

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = (): ThunkAction<
  void,
  RootState,
  unknown,
  PayloadAction<INote[] | void>
> => {
  return async (dispatch, getState) => {
    dispatch(setLoading());
    const { uid } = getState().auth;
    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
    dispatch(stopLoading());
  };
};

export const startSaveNote = (): ThunkAction<
  void,
  RootState,
  unknown,
  PayloadAction<void | IActive | { errorMessage: string } | { message: IMessage | null } | null>
> => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: activeNote } = getState().journal;
    const { message: message } = getState().UI;
    if (!activeNote) return;

    dispatch(setSaving());

    const updatedNote: IActive = { ...activeNote, date: Timestamp.now().toMillis() };
    const docRef = doc(firestore, `users/${uid}/journal/${activeNote?.id}`).withConverter(
      noteConverter
    );

    try {
      await setDoc(docRef, updatedNote, { merge: true });
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error);
        const errorMessage = error.message;
        return dispatch(setError({ errorMessage }));
      }
    }
    dispatch(updateNote(updatedNote));
    if (!message)
      dispatch(
        setMessage({
          message: {
            title: 'Note saved',
            body: `${updatedNote.title} updated!`,
          },
        })
      );
  };
};

export const startUploadingFiles = (
  files: FileList
): ThunkAction<
  void,
  RootState,
  unknown,
  PayloadAction<void | IActive | IImagesUrls[] | { errorMessage: string }>
> => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active } = getState().journal;

    if (!uid || !active) return;

    const fileUploadPromises = [];
    let uploadTasksArray: UploadTaskSnapshot[] = [];

    if (files.length + active.imagesUrls.length > 10) {
      return dispatch(
        setError({ errorMessage: 'Limit exceeded: You can only have 10 images per note.' })
      );
    }

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file, active.id, uid));
    }

    try {
      uploadTasksArray = await Promise.all(fileUploadPromises);
    } catch (error) {
      if (error instanceof StorageError) {
        console.error(error);
        const errorMessage = error.message;
        return dispatch(setError({ errorMessage }));
      }
    }

    const photoUrls: IImagesUrls[] = [];

    for (const uploadTask of uploadTasksArray) {
      try {
        const url = await getDownloadURL(uploadTask.ref);
        photoUrls.push({
          name: uploadTask.metadata.name,
          url,
        });
      } catch (error) {
        if (error instanceof StorageError) {
          console.error(error);
          const errorMessage = error.message;
          return dispatch(setError({ errorMessage }));
        }
      }
    }

    dispatch(setPhotosToActiveNote(photoUrls));
    dispatch(startSaveNote());
  };
};

export const startDeletingNote = (): ThunkAction<
  void,
  RootState,
  unknown,
  PayloadAction<{ id?: string } | { errorMessage: string }>
> => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: activeNote } = getState().journal;

    if (!activeNote || !uid) return;

    const docRef = doc(firestore, `users/${uid}/journal/${activeNote?.id}`).withConverter(
      noteConverter
    );

    const fileDeletePromises: Promise<void>[] = [];

    for (const url of activeNote.imagesUrls) {
      fileDeletePromises.push(fileDelete(url.name, activeNote.id, uid));
    }

    try {
      await Promise.all(fileDeletePromises);
    } catch (error) {
      if (error instanceof StorageError) {
        console.error(error);
        const errorMessage = error.message;
        return dispatch(setError({ errorMessage }));
      }
    }

    await deleteDoc(docRef);

    dispatch(deleteNoteById({ id: activeNote?.id }));
  };
};

export const startDeletingImage = (
  titleImage: string
): ThunkAction<
  void,
  RootState,
  unknown,
  PayloadAction<{ title: string } | { errorMessage: string } | { message: IMessage | null }>
> => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: activeNote } = getState().journal;
    const { message: message } = getState().UI;

    if (!activeNote || !uid) return;

    try {
      await fileDelete(titleImage, activeNote.id, uid);
    } catch (error) {
      if (error instanceof StorageError) {
        console.error(error);
        const errorMessage = error.message;
        return dispatch(setError({ errorMessage }));
      }
    }

    dispatch(deleteImageByTitle({ title: titleImage }));
    if (!message)
      dispatch(
        setMessage({
          message: {
            title: `Deleted!`,
            body: `Image Deleted`,
          },
        })
      );
    dispatch(startSaveNote());
  };
};
