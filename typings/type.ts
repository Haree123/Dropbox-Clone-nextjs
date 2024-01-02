export type FileType = {
  id: string;
  downloadURL: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fullName: string;
  timeStamp: string;
};

export interface FileInitialState {
  fileId: string;
  fileName: string;
  isDeleteModalOpen: boolean;
  isRenameModalOpen: boolean;
}

export interface RenameState {
  fileName: string;
  isOpen: boolean;
}

export interface RootState {
  file: FileInitialState;
}
