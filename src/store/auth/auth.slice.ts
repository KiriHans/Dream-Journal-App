import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    uid: null,
    email: null,
    displayName: 'Guest',
    photoURL: null,
    error: null,
    loading: false,
  },
  reducers: {
    login: (state, { payload }) => {
      {
        state;
        payload;
      }
    },
    logout: (state, { payload }) => {
      {
        state;
        payload;
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
