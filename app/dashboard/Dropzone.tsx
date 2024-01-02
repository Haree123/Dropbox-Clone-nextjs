"use client";
import { useToast } from "@/components/ui/use-toast";
import { db, storage } from "../firebase/config";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import DropzoneComponent from "react-dropzone";
import prettyBytes from "pretty-bytes";

const Dropzone = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const maxSize: number = 10485760;

  const [loading, setLoading] = useState<boolean>(false);

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;

    setLoading(true);

    toast({
      title: "Uploading...",
      description: `File Name: ${selectedFile.name} | ${prettyBytes(
        selectedFile.size
      )}`,
    });

    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      fileName: selectedFile.name,
      fullName: user.fullName,
      fileType: selectedFile.type,
      fileSize: selectedFile.size,
      timestamp: serverTimestamp(),
      userId: user.id,
    });

    const imgRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

    uploadBytes(imgRef, selectedFile).then(async () => {
      const downloadURL = await getDownloadURL(imgRef);

      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadURL,
      });
    });

    toast({
      title: "Uploaded",
      description: `File Name: ${selectedFile.name} | ${prettyBytes(
        selectedFile.size
      )}`,
    });

    setLoading(false);
  };

  const handleFileRead = (selectedFile: File) => {
    const reader = new FileReader();

    reader.onabort = () => console.log("File Reading was aborted");
    reader.onerror = () => console.log("File Reading has failed");

    reader.onload = () => {
      uploadPost(selectedFile);
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      handleFileRead(file);
    });
  };

  return (
    <DropzoneComponent minSize={0} maxSize={maxSize} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

        return (
          <section>
            <div
              {...getRootProps()}
              className={cn(
                "border border-dotted cursor-pointer rounded-md m-5 p-20 text-center",
                isDragActive
                  ? "bg-[#035FFE] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload"}
              {isDragActive && !isDragReject && "Drop to upload this file!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger ">File too large!</div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
};

export default Dropzone;
