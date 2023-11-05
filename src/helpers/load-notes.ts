import { collection, getDocs } from 'firebase/firestore';
import { firestore } from 'src/firebase/config';
import { noteConverter } from 'src/firebase/converters';
import { INote } from 'src/store/interfaces';

export const loadNotes = async (uid: string | null = '') => {
  if (!uid) throw new Error("User's UID doesn't exist");

  const journalRef = collection(firestore, `users/${uid}/journal`).withConverter(noteConverter);
  const { docs } = await getDocs(journalRef);

  const notes: INote[] = docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return notes;
};
