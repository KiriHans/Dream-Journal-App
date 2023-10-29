export interface IActive {
  id?: string;
  title: string;
  body: string;
  date: number;
  imagesUrls?: string[];
}

export interface INote {
  id?: string;
  title: string;
  body: string;
  date: number;
}

export interface IJournalSliceState {
  isSaving: boolean;
  messageSaved: string;
  notes: INote[];
  active: IActive | null;
}
