import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMessage, IUISliceState } from '../interfaces';
import { RootState } from '..';

const UISliceName = 'UI';
const initialState: IUISliceState = {
  isMobileOpen: false,
  doesMatchBreakpointSm: false,
  message: null,
};

const UISlice = createSlice({
  name: UISliceName,
  initialState,
  reducers: {
    setMobileOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isMobileOpen = payload;
    },
    updateBreakpoint: (state, { payload }: PayloadAction<{ matches: boolean }>) => {
      state.doesMatchBreakpointSm = payload.matches;
    },
    setMessage: (state, { payload }: PayloadAction<{ message: IMessage | null }>) => {
      state.message = payload.message;
    },
  },
});

export const { setMobileOpen, updateBreakpoint, setMessage } = UISlice.actions;

export const UIReducer = UISlice.reducer;

export const selectUI = (state: RootState) => state.UI;
