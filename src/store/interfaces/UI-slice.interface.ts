export interface IMessage {
  title: string;
  body: string;
}

export interface IUISliceState {
  isMobileOpen: boolean;
  isModalOpen: boolean;
  doesMatchBreakpointSm: boolean;
  message: IMessage | null;
}
