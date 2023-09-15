export type StatusAuth = 'checking' | 'non-authenticated' | 'authenticated';

export interface IAuthSliceState {
  uid: null | string;
  email: null | string;
  displayName: null | string;
  photoURL: null | string;
  status: StatusAuth;
  error: null | string;
}
