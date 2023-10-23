import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/Auth.routes';
import { JournalRoutes } from '../journal/routes/Journal.routes';
import { CheckingAuth } from 'src/UI/components';
import { useCheckAuth } from 'src/hooks';

const AppRouter = () => {
  const { status } = useCheckAuth();

  return status === 'checking' ? (
    <CheckingAuth />
  ) : (
    <Routes>
      {status === 'authenticated' ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default AppRouter;
