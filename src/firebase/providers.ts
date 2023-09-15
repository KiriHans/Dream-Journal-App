import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { fbAuth } from './config';
import { FirebaseError } from 'firebase/app';
import { getErrorMessage } from 'src/utilities/error';
import { ErrorSignInGoogle, ResultSignInGoogle } from './interfaces';

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async (): Promise<ResultSignInGoogle | ErrorSignInGoogle> => {
  try {
    const result = await signInWithPopup(fbAuth, googleProvider);
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

      return {
        ok: false,
        errorCode,
        errorMessage,
        email,
        credential,
      };
    }
    return {
      ok: false,
      errorMessage: getErrorMessage(error),
    };
  }
};
