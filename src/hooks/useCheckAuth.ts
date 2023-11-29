import { User } from 'firebase/auth';
import { fbAuth } from 'src/firebase/config';
import { login } from 'src/store/auth';
import { useAppSelector, useAppDispatch } from './useAppDispatch';
import { useAuthState } from 'react-firebase-hooks/auth';
import { selectAuth, startLoadingNotes } from 'src/store/journal';

export const useCheckAuth = () => {
  const { status } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const onUserChanged = async (user: User | null) => {
    console.log(user, 'user');
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
