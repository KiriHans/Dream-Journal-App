import { PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { checkingCredentials } from '.';
import { RootState } from '../store';

export const checkingAuthentication = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, PayloadAction<void>> => {
  return async function (dispatch) {
    {
      email;
      password;
    }
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = (): ThunkAction<void, RootState, unknown, PayloadAction<void>> => {
  return async function () {
    console.log('start');
  };
};
