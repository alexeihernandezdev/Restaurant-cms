"use client";

import { TextArea, FieldError } from "@heroui/react";

interface RHFTextareaProps {
  placeholder?: string;
  label?: string;
  register: any;
  name: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  minLength?: number;
  maxLength?: number;
  className?: string;
  fullWidth?: boolean;
  rows?: number;
  error?: string;
}

export function RHFTextarea({
  placeholder,
  label,
  register,
  name,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  minLength,
  maxLength,
  className,
  fullWidth = true,
  rows = 3,
  error,
}: RHFTextareaProps) {
  const { onChange, onBlur, name: regName, ref } = register(name);
  const isInvalid = !!error;

  return (
    <>
      <TextArea
        placeholder={placeholder}
        label={label}
        isRequired={isRequired}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        minLength={minLength}
        maxLength={maxLength}
        className={className}
        fullWidth={fullWidth}
        rows={rows}
        name={regName}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        isInvalid={isInvalid}
      />
      {error && <FieldError>{error}</FieldError>}
    </>
  );
}