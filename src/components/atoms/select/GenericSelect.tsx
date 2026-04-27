"use client";

import { Select, Label, ListBox } from "@heroui/react";
import type { Key } from "@react-types/shared";

export interface SelectOption {
  id: string;
  label: string;
}

interface GenericSelectProps {
  value?: Key | null;
  defaultValue?: Key | null;
  onChange?: (value: Key | null) => void;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  name?: string;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
}

export function GenericSelect({
  value,
  defaultValue,
  onChange,
  options,
  label,
  placeholder = "Seleccionar...",
  isRequired = false,
  isDisabled = false,
  isInvalid = false,
  name,
  fullWidth = true,
  variant = "primary",
  className,
}: GenericSelectProps) {
  const isControlled = value !== undefined;

  return (
    <Select
      className={className}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      name={name}
      fullWidth={fullWidth}
      variant={variant}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
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
  );
}
