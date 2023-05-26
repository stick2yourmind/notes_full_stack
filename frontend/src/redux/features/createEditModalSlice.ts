
import { Note } from '@/data/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum CreateEditModalType {
  // eslint-disable-next-line no-unused-vars
  CREATE = 'CREATE',
  // eslint-disable-next-line no-unused-vars
  EDIT = 'EDIT',
  // eslint-disable-next-line no-unused-vars
  NONE = 'NONE',
}

type createEditModalStateType = {
  enable: boolean;
  type: CreateEditModalType;
  currentNote: Pick<Note, 'id' | 'title' | 'description' | 'archived'> | null;
};

const initialCreateEditModalState: createEditModalStateType = {
  enable: false,
  currentNote: null,
  type: CreateEditModalType.NONE,
};

export const createEditModalSlice = createSlice({
  name: 'createEditModal',
  initialState: initialCreateEditModalState,
  reducers: {
    resetCreateEditModal: () => initialCreateEditModalState,
    enableCreateEditModal: (state, action: PayloadAction<Omit<createEditModalStateType, 'enable'>>) => {
      const { payload } = action;
      const newState = {
        enable: true,
        ...payload,
      };
      return newState;
    },
  },
});

export const { resetCreateEditModal, enableCreateEditModal } = createEditModalSlice.actions;
export default createEditModalSlice.reducer;
