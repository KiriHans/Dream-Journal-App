import { Timestamp } from 'firebase/firestore';
import { IImagesUrls } from 'src/store/interfaces';

export interface NoteDbModel {
  title: string;
  body: string;
  date: Timestamp;
  imagesUrls: IImagesUrls[];
}
