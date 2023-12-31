import { FirestoreDataConverter, Timestamp } from 'firebase/firestore';
import { INote } from 'src/store/interfaces';
import { NoteDbModel } from './interfaces/journal.interface';

export const noteConverter: FirestoreDataConverter<INote, NoteDbModel> = {
  toFirestore: (note: INote): NoteDbModel => {
    const noteToFirebase = { ...note };
    delete noteToFirebase.id;
    return {
      ...noteToFirebase,
      date: Timestamp.fromMillis(note.date),
    };
  },
  fromFirestore: (snapshot, options) => {
    const note = snapshot.data(options) as NoteDbModel;

    return { ...note, date: note.date.toMillis(), id: snapshot.id };
  },
};
