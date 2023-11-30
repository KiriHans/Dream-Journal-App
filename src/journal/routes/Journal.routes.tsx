import { Routes, Route, Navigate } from 'react-router-dom';
import { JournalPage } from '../pages/Journal.page';
import { NoteView, NothingSelectedView } from '../view';
import { useAppSelector } from 'src/hooks/useAppDispatch';
import { selectJournal } from 'src/store/journal';
import { CheckingAuth } from 'src/UI/components';

export const JournalRoutes = () => {
  const { loading, active } = useAppSelector(selectJournal);

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
