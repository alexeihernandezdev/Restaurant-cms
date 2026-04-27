"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Kbd, Spinner } from "@heroui/react";

interface DropZoneProps {
  onFileUpload: (file: File) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  isDisabled?: boolean;
  uploading?: boolean;
}

export function DropZone({
  onFileUpload,
  accept = { "image/*": [] },
  maxSize = 5 * 1024 * 1024,
  isDisabled = false,
  uploading = false,
}: DropZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    maxSize,
    disabled: isDisabled || uploading,
    noClick: true,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
        ${isDragActive ? "border-heroui-primary bg-heroui-primary/10" : "border-zinc-300 hover:border-heroui-primary/50"}
        ${isDisabled || uploading ? "opacity-50 cursor-not-allowed" : ""}
      `}
      onClick={open}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        <Kbd className={isDragActive ? "bg-heroui-primary text-white" : ""}>
          📁
        </Kbd>
        <span className="text-sm text-zinc-500">
          {uploading
            ? "Subiendo imagen..."
            : isDragActive
              ? "Suelta la imagen aquí"
              : "Arrastra una imagen o haz clic para seleccionar"}
        </span>
      </div>
      {uploading && (
        <div className="mt-3 flex justify-center">
          <Spinner size="sm" color="accent" aria-label="Subiendo..." />
        </div>
      )}
    </div>
  );
}