import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import { journalReducer } from './journal';
import { UIReducer } from './UI/UI-slice';

export const store = configureStore({
  reducer: {
    UI: UIReducer,
    auth: authReducer,
    journal: journalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
