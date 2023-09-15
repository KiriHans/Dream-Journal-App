import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthSliceState } from '../interfaces';

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
    login: (state, { payload }) => {
      {
        state;
        payload;
      }
    },
    logout: (state, { payload }: PayloadAction<{ errorMessage: string }>) => {
      state = { ...initialState, error: payload.errorMessage };
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;
