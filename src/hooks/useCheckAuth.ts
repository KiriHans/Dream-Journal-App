import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { fbAuth } from 'src/firebase/config';
import { logout, login } from 'src/store/auth';
import { useAppSelector, useAppDispatch } from './useAppDispatch';

export const useCheckAuth = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(fbAuth, async (user) => {
      if (!user) return dispatch(logout({}));
      const { uid, email, displayName, photoURL } = user;
      return dispatch(login({ ok: true, uid, email, displayName, photoURL }));
    });
    console.log('init');
  }, []);

  return { status };
};
