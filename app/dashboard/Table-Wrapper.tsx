"use client";
import { DataTable } from "@/components/Data-Table";
import { Button } from "@/components/ui/button";
import { FileType } from "@/typings/type";
import { TableColumns } from "./Table-Columns";
import { useUser } from "@clerk/nextjs";

const TableWrapper = ({ skeletonFiles }: { skeletonFiles: FileType[] }) => {
  return (
    <div className="m-6">
      <div className="flex justify-between items-center">
        <p className="font-bold text-md">All Files</p>

        <Button>Sort By</Button>
      </div>

      <div className="my-8">
        <DataTable data={skeletonFiles} columns={TableColumns} />
      </div>
    </div>
  );
};

export default TableWrapper;
