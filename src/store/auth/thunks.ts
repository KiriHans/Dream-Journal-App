import { PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { checkingCredentials, login, logout } from '.';
import { RootState } from '../store';
import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmail,
  signInWithGoogle,
} from 'src/firebase/providers';
import { ResultSignInGoogle } from 'src/firebase/interfaces';
import { IFormLogin, IFormRegister } from 'src/auth/interfaces';
import { clearNotes } from '../journal';

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

export const startGoogleSignIn = (): ThunkAction<
  void,
  RootState,
  unknown,
  PayloadAction<{ errorMessage?: string } | ResultSignInGoogle | void>
> => {
  return async function (dispatch) {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();
    if (!result.ok) {
      const errorMessage = result.errorMessage;
      return dispatch(logout({ errorMessage }));
    }

    dispatch(login(result));
  };
};

export const startRegisterUserWithEmailPassword = ({
  displayName,
  password,
  email,
}: IFormRegister): ThunkAction<
  void,
  RootState,
  unknown,
  PayloadAction<{ errorMessage?: string } | ResultSignInGoogle | void>
> => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await registerUserWithEmail({ displayName, password, email });

    if (!result.ok) {
      const errorMessage = result.errorMessage;
      return dispatch(logout({ errorMessage }));
    }

    dispatch(login(result));
  };
};

export const startLoginUserWithEmailPassword = ({
  password,
  email,
}: IFormLogin): ThunkAction<
  void,
  RootState,
  unknown,
  PayloadAction<{ errorMessage?: string } | ResultSignInGoogle | void>
> => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({ password, email });

    if (!result.ok) {
      const errorMessage = result.errorMessage;
      return dispatch(logout({ errorMessage }));
    }

    dispatch(login(result));
  };
};

export const startLogout = (): ThunkAction<
  void,
  RootState,
  unknown,
  PayloadAction<{ errorMessage?: string } | void>
> => {
  return async (dispatch) => {
    await logoutFirebase();

    dispatch(logout({}));
    dispatch(clearNotes());
  };
};
