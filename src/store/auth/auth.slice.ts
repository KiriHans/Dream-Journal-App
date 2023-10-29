import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthSliceState } from '../interfaces';
import { ResultSignInGoogle } from 'src/firebase/interfaces';

const authSliceName = 'auth';
const initialState: IAuthSliceState = {
  uid: null,
  email: null,
  displayName: 'Guest',
  photoURL: null,
  status: 'non-authenticated',
  error: null,
};

const authSlice = createSlice({
  name: authSliceName,
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<ResultSignInGoogle>) => {
      const { displayName, email, photoURL, uid } = payload;
      state = { displayName, email, photoURL, uid, status: 'authenticated', error: null };
      return state;
    },
    logout: (state, { payload }: PayloadAction<{ errorMessage?: string }>) => {
      state = { ...initialState, status: 'non-authenticated', error: payload.errorMessage ?? null };
      return state;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;
