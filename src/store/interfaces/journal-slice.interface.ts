export interface IActive {
  id?: string;
  title: string;
  body: string;
  date: number;
  imagesUrls: IImagesUrls[];
}

export interface INote {
  id?: string;
  title: string;
  body: string;
  date: number;
  imagesUrls: IImagesUrls[];
}

export interface IJournalSliceState {
  isSaving: boolean;
  messageSaved: string;
  notes: INote[];
  active: IActive | null;
}

export interface IImagesUrls {
  name: string;
  url: string;
}
