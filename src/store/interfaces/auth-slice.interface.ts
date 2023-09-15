export type StatusAuth = 'checking' | 'non-authenticated' | 'authenticated';

export interface IAuthSliceState {
  uid: null | string;
  email: null | string;
  displayName: string;
  photoURL: null | string;
  status: StatusAuth;
  error: null | string;
}
