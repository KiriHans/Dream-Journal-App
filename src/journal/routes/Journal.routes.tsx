import { Routes, Route, Navigate } from 'react-router-dom';
import { JournalPage } from '../pages/Journal.page';
import { NoteView, NothingSelectedView } from '../view';

export const JournalRoutes = () => {
  return (
    <Routes>
      <Route path="/journal" element={<JournalPage />}>
        <Route path="" element={<NothingSelectedView />} />
        <Route path=":id/:title" element={<NoteView />} />
        <Route path="*/*" element={<Navigate to="/journal" />} />
      </Route>

      <Route path="/*" element={<Navigate to="/journal" />} />
    </Routes>
  );
};
