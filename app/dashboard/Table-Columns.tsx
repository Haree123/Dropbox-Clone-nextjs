"use client";

import { FileType } from "@/typings/type";
import { ColumnDef } from "@tanstack/react-table"
import { FileIcon, defaultStyles } from "react-file-icon";
import prettyBytes from "pretty-bytes";

export const TableColumns: ColumnDef<FileType>[] = [
  {
    accessorKey: "fileType",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extension: string = type.split("/")[1];

      return (
        <div className="mx-auto w-10">
          <FileIcon
            extension={extension}
            color="#d4af37"
            // @ts-ignore
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "fileName",
    header: "File Name",
  },
  {
    accessorKey: "timeStamp",
    header: "Date & Time",
  },
  {
    accessorKey: "fileSize",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      const size = renderValue() as number;

      return <div>{prettyBytes(size)}</div>;
    },
  },
  {
    accessorKey: "downloadURL",
    header: "Link",
    cell: ({ renderValue, ...props }) => {
      const url = renderValue() as string;

      return (
        <a
          href={url}
          target="_blank"
          className="text-blue-500 hover:text-blue-600 underline"
        >
          Download
        </a>
      );
    },
  },
];
