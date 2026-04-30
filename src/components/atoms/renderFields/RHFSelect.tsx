"use client";

import { FieldError, Label, Select, ListBox } from "@heroui/react";

interface RHFSelectProps {
  register: any;
  name: string;
  options: { id: string; label: string }[];
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
  error?: string;
}

export function RHFSelect({
  register,
  name,
  options,
  label,
  placeholder = "Seleccionar...",
  isRequired = false,
  isDisabled = false,
  className,
  fullWidth = true,
  variant = "primary",
  error,
}: RHFSelectProps) {
  const { onChange, onBlur, name: regName, ref } = register(name);
  const isInvalid = !!error;

  return (
    <>
      <Select
        className={className}
        isRequired={isRequired}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        fullWidth={fullWidth}
        variant={variant}
        placeholder={placeholder}
        name={regName}
        onChange={onChange}
        onBlur={onBlur}
      >
        {label && <Label>{label}</Label>}
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {options.map((option) => (
              <ListBox.Item key={option.id} id={option.id} textValue={option.label}>
                {option.label}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
      {error && <FieldError>{error}</FieldError>}
    </>
  );
}