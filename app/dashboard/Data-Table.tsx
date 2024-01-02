"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../../components/ui/button";
import { FileType } from "@/typings/type";
import { useDispatch } from "react-redux";
import { PencilIcon, TrashIcon } from "lucide-react";
import {
  setDeleteModal,
  setFileId,
  setRenameModal,
} from "../redux/reducers/files.reducer";
import { DeleteModal } from "../../components/deleteModal";
import { RenameModal } from "../../components/renameModal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const dispatch = useDispatch();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const deleteFile = (fileId: string) => {
    dispatch(setFileId(fileId));
    dispatch(setDeleteModal(true));
  };

  const renameFile = (fileId: string, fileName: string) => {
    dispatch(setFileId(fileId));
    dispatch(
      setRenameModal({
        fileName,
        isOpen: true,
      })
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="text-center"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                <DeleteModal />
                <RenameModal />

                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === "fileName" ? (
                      <div
                        className="flex space-x-2 justify-center items-center underline text-blue-500 hover:cursor-pointer"
                        onClick={() => {
                          const rowObj = row.original as FileType;
                          renameFile(rowObj.id, rowObj.fileName);
                        }}
                      >
                        <p>{cell.getValue() as string}</p>
                        <PencilIcon size="15" />
                      </div>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}

                <TableCell>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      const rowObj = row.original as FileType;
                      deleteFile(rowObj.id);
                    }}
                  >
                    <TrashIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
