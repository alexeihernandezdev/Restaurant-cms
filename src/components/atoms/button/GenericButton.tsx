"use client";

import { Button } from "@heroui/react";
import type { ButtonProps } from "@heroui/react";
import type { ReactNode } from "react";

export interface GenericButtonProps extends Omit<ButtonProps, "children"> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "ghost" | "danger";
}

export function GenericButton({
  children,
  variant = "primary",
  ...props
}: GenericButtonProps) {
  return (
    <Button variant={variant} {...props}>
      {children}
    </Button>
  );
}