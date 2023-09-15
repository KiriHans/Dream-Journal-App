import { PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { checkingCredentials, login, logout } from '.';
import { RootState } from '../store';
import { signInWithGoogle } from 'src/firebase/providers';
import { ResultSignInGoogle } from 'src/firebase/interfaces';

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

// export const startGoogleSignIn = createAsyncThunk<{disp}>('auth', async (dispatch) => {
//   const result = await signInWithGoogle();

//   return result;
// });

export const startGoogleSignIn = (): ThunkAction<
  void,
  RootState,
  unknown,
  PayloadAction<{ errorMessage: string } | ResultSignInGoogle | void>
> => {
  return async function (dispatch) {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();
    if (!result.ok) {
      const errorMessage = result.errorMessage;
      return dispatch(logout({ errorMessage }));
    }

    console.log(result, 'startgoogleI');
    dispatch(login(result));
  };
};
