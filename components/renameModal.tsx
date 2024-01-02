"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/typings/type";
import { setRenameModal } from "@/app/redux/reducers/files.reducer";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";

export function RenameModal() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { fileId, fileName, isRenameModalOpen } = useSelector(
    (state: RootState) => state.file
  );

  const [inputValue, setInputValue] = useState<string>("");

  const handleModal = () => {
    dispatch(
      setRenameModal({
        fileName: "",
        isOpen: false,
      })
    );
  };

  const handleRename = async () => {
    if (!user || !fileId) return;

    await updateDoc(doc(db, "users", user.id, "files", fileId), {
      fileName: inputValue,
    })
      .then(() => {
        setInputValue("");
        dispatch(
          setRenameModal({
            isOpen: false,
            fileName: "",
          })
        );
      })
      .catch((e) => {
        setInputValue("");
        dispatch(
          setRenameModal({
            isOpen: false,
            fileName: "",
          })
        );
      });
  };

  useEffect(() => {
    if (fileName) {
      setInputValue(fileName);
    }
  }, [fileName]);

  return (
    <Dialog open={isRenameModalOpen} onOpenChange={() => handleModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
          <DialogDescription>
            This can rename your filename from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDownCapture={(e) => {
                if (e.key === "Enter") {
                  handleRename();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleRename()}
            >
              Rename
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
