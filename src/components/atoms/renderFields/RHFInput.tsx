"use client";

import { Input, FieldError } from "@heroui/react";

interface RHFInputProps {
  type?: "text" | "number" | "email" | "password" | "tel" | "url";
  placeholder?: string;
  label?: string;
  register: any;
  name: string;
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
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function RHFInput({
  type = "text",
  placeholder,
  label,
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
  error,
  onChange,
}: RHFInputProps) {
  const { onChange: regOnChange, onBlur, name: regName, ref } = register(name);
  const isInvalid = !!error;

  return (
    <>
      <Input
        type={type}
        placeholder={placeholder}
        label={label}
        isRequired={isRequired}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        min={min}
        max={max}
        step={step}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        className={className}
        fullWidth={fullWidth}
        name={regName}
        onChange={(e) => {
          regOnChange(e);
          if (onChange) onChange(e);
        }}
        onBlur={onBlur}
        ref={ref}
        isInvalid={isInvalid}
      />
      {error && <FieldError>{error}</FieldError>}
    </>
  );
}