import { OAuthCredential } from 'firebase/auth';

export interface ErrorSignInGoogle {
  ok: false;
  errorMessage: string;
  errorCode?: string;
  email?: unknown;
  credential?: OAuthCredential | null;
}
