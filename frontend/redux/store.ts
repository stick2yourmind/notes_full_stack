import { configureStore } from "@reduxjs/toolkit";
import deleteModalReducer from "./features/deleteModalSlice";
import toastReducer from "./features/toastSlice";
import noteReducer from "./features/noteSlice";

export const store = configureStore({
  reducer: {
    deleteModalReducer,
    toastReducer,
    noteReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
