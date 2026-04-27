"use client";

import { Input } from "@heroui/react";
import type { UseFormRegister } from "react-hook-form";

interface GenericInputProps {
  type?: "text" | "number" | "email" | "password" | "tel" | "url";
  placeholder?: string;
  label?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegister<Record<string, unknown>>;
  name?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  className?: string;
  fullWidth?: boolean;
}

export function GenericInput({
  type = "text",
  placeholder,
  label,
  value,
  defaultValue,
  onChange,
  register,
  name,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  min,
  max,
  step,
  minLength,
  maxLength,
  pattern,
  className,
  fullWidth = true,
}: GenericInputProps) {
  const isControlled = value !== undefined;

  const inputProps = {
    type,
    placeholder,
    label,
    isRequired,
    isDisabled,
    isReadOnly,
    min,
    max,
    step,
    minLength,
    maxLength,
    pattern,
    className,
    fullWidth,
    value: isControlled ? value : undefined,
    defaultValue: !isControlled ? defaultValue : undefined,
    onChange: isControlled ? onChange : undefined,
  };

  if (register && name) {
    const { onChange: regOnChange, onBlur, name: regName, ref } = register(name);

    return (
      <Input
        {...inputProps}
        name={regName}
        onChange={(e) => {
          regOnChange(e);
          if (onChange) onChange(e);
        }}
        onBlur={onBlur}
        ref={ref}
      />
    );
  }

  return <Input {...inputProps} />;
}
