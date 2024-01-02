"use client";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { FileType } from "@/typings/type";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/Data-Table";
import { TableColumns } from "./Table-Columns";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";

const TableWrapper = ({ skeletonFiles }: { skeletonFiles: FileType[] }) => {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const [docs] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );

  useEffect(() => {
    if (!docs) return;

    const files: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      fileName: doc.data().fileName || doc.id,
      fileSize: doc.data().fileSize,
      fileType: doc.data().fileType,
      fullName: doc.data().fullName,
      timeStamp: doc.data().timestamp
        ? format(doc.data().timestamp?.toDate(), "dd-MM-yyyy hh:mm a")
        : "",
      downloadURL: doc.data().downloadURL,
    }));

    setInitialFiles(files);
  }, [docs]);

  return (
    <div className="m-6">
      <div className="flex justify-between items-center">
        <p className="font-bold text-md">All Files</p>

        {docs?.docs.length === undefined ? (
          <Button className="w-36" variant="outline">
            <Skeleton className="h-5 w-full" />
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => {
              setSort(sort === "asc" ? "desc" : "asc");
            }}
          >
            Sort By {sort === "asc" ? "Oldest" : "Newest"}
          </Button>
        )}
      </div>

      {docs?.docs.length === undefined ? (
        <div className="border rounded-lg my-8">
          <div className="border-b h-12">
            <Skeleton className="h-12 w-full" />
          </div>

          {skeletonFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center space-x-4 p-5 w-full"
            >
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}

          {skeletonFiles.length === 0 && (
            <div className="flex items-center space-x-4 p-5 w-full">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
        </div>
      ) : (
        <div className="my-8">
          <DataTable data={initialFiles} columns={TableColumns} />
        </div>
      )}
    </div>
  );
};

export default TableWrapper;
