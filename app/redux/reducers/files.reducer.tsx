import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FileInitialState, RenameState } from "@/typings/type";

const initialState: FileInitialState = {
  fileId: "",
  fileName: "",
  isDeleteModalOpen: false,
  isRenameModalOpen: false,
};

const FileReducer = createSlice({
  name: "File",
  initialState,
  reducers: {
    setDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.isDeleteModalOpen = action.payload;
    },
    setRenameModal: (state, action: PayloadAction<RenameState>) => {
      state.fileName = action.payload.fileName;
      state.isRenameModalOpen = action.payload.isOpen;
    },
    setFileId: (state, action: PayloadAction<string>) => {
      state.fileId = action.payload;
    },
  },
});

export const { setDeleteModal, setRenameModal, setFileId } =
  FileReducer.actions;

export default FileReducer.reducer;
