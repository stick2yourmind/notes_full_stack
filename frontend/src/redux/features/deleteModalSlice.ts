import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type deleteModalStateType = {
  enable: boolean;
  currentNoteId: number | null;
};

const initialDeleteModalState: deleteModalStateType = {
  enable: false,
  currentNoteId: null,
};

export const deleteModal = createSlice({
  name: 'deleteModal',
  initialState: initialDeleteModalState,
  reducers: {
    resetDeleteModal: () => initialDeleteModalState,
    enableDeleteModal: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      const newState = {
        enable: true,
        currentNoteId: payload,
      };
      return newState;
    },
  },
});

export const { enableDeleteModal, resetDeleteModal } = deleteModal.actions;
export default deleteModal.reducer;
