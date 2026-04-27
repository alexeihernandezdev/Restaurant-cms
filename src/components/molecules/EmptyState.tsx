"use client";

import { PackageX } from "lucide-react";
import { Button } from "@heroui/react";

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          <PackageX className="w-12 h-12 text-zinc-400" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-zinc-300 dark:bg-zinc-600" />
      </div>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 text-center max-w-sm mb-4">
        {message}
      </p>
      {actionLabel && onAction && (
        <Button
          color="primary"
          variant="flat"
          onPress={onAction}
          className="mt-2"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}