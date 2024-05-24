import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { JournalPage } from '../pages/Journal.page';
import { NoteView, NothingSelectedView } from '../view';
import { useAppSelector } from 'src/hooks/useAppDispatch';
import { selectJournal } from 'src/store/journal';
import { CheckingAuth } from 'src/UI/components';
import { useEffect } from 'react';

export const JournalRoutes = () => {
  const { loading, active } = useAppSelector(selectJournal);
  const navigate = useNavigate();

  useEffect(() => {
    if (active && active.id && active.title) {
      console.log(`/journal/${active.id}/${active.title}`);
      navigate(`/journal/${active.id}/${active.title}`);
    }
  }, [active?.id, active?.title]);

  return loading ? (
    <CheckingAuth />
  ) : (
    <Routes>
      <Route path="/journal" element={<JournalPage />}>
        {!active ? (
          <Route path="" element={<NothingSelectedView />} />
        ) : (
          <Route path=":id/:title" element={<NoteView />} />
        )}
        <Route path="*/*" element={<Navigate to="/journal" />} />
      </Route>

      <Route path="/*" element={<Navigate to="/journal" />} />
    </Routes>
  );
};
