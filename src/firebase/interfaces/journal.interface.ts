import { Timestamp } from 'firebase/firestore';

export interface NoteDbModel {
  title: string;
  body: string;
  date: Timestamp;
  id?: string;
}
