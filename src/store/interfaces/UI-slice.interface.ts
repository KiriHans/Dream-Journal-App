export interface IMessage {
  title: string;
  body: string;
}

export interface IUISliceState {
  isMobileOpen: boolean;
  doesMatchBreakpointSm: boolean;
  message: IMessage | null;
}
