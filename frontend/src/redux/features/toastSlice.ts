import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ToastType {
  // eslint-disable-next-line no-unused-vars
  ERROR = 'ERROR',
  // eslint-disable-next-line no-unused-vars
  SUCCESS = 'SUCCESS',
  // eslint-disable-next-line no-unused-vars
  NONE = 'NONE'
}

type ToastStateType = {
  enable: boolean,
  type: ToastType,
  message: string
} 

const initialToastState:ToastStateType = {
  enable: false,
  type: ToastType.NONE,
  message: ''
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState: initialToastState,
  reducers: {
    resetToast: () => initialToastState,
    enableToast: (state, action: PayloadAction<Omit<ToastStateType, 'enable'>>) => {
      const { payload } = action;
      const newState = {
        enable: true,
        type: payload.type,
        message: payload.message
      };
      return newState;
    },

  }
});

export const {
  resetToast,
  enableToast,
} = toastSlice.actions;

export default toastSlice.reducer;
