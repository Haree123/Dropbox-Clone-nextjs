import { useUser } from "@clerk/nextjs";
import { db, storage } from "@/app/firebase/config";
import { setDeleteModal } from "@/app/redux/reducers/files.reducer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RootState } from "@/typings/type";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";

export function DeleteModal() {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { fileId, isDeleteModalOpen } = useSelector(
    (state: RootState) => state.file
  );

  const handleModal = async () => {
    dispatch(setDeleteModal(false));
  };

  const handleDeleteFile = () => {
    if (!user || !fileId) return;

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    deleteObject(fileRef)
      .then(async () => {
        deleteDoc(doc(db, "users", user.id, "files", fileId));
      })
      .then(() => {
        dispatch(setDeleteModal(false));
      })
      .catch((e) => {
        dispatch(setDeleteModal(false));
      });
  };

  return (
    <AlertDialog open={isDeleteModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your file
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleModal()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteFile()}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
