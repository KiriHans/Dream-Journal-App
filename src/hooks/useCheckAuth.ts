import { User } from 'firebase/auth';
import { fbAuth } from 'src/firebase/config';
import { login } from 'src/store/auth';
import { useAppSelector, useAppDispatch } from './useAppDispatch';
import { useAuthState } from 'react-firebase-hooks/auth';
import { startLoadingNotes } from 'src/store/journal';

export const useCheckAuth = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const onUserChanged = async (user: User | null) => {
    if (!user) {
      return;
    }

    const { uid, email, displayName, photoURL } = user;
    dispatch(login({ ok: true, uid, email, displayName, photoURL }));
    dispatch(startLoadingNotes());
  };

  const [user, loading, error] = useAuthState(fbAuth, { onUserChanged });

  return { status, user, loading, error };
};
