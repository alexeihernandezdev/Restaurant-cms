"use client";

import { Modal } from "@heroui/react";
import { ReactNode, useState } from "react";
import { GenericButton } from "@components/atoms/button";

interface GenericModalProps {
  triggerText?: string;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  size?: "xs" | "sm" | "md" | "lg" | "cover" | "full";
  placement?: "auto" | "top" | "center" | "bottom";
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  className?: string;
}

export function GenericModal({
  triggerText = "Open Modal",
  title,
  children,
  footer,
  isOpen: controlledIsOpen,
  onOpenChange,
  size = "md",
  placement = "center",
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  className,
}: GenericModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const handleOpenChange = isControlled ? onOpenChange! : setInternalIsOpen;

  return (
    <Modal>
      <GenericButton variant="primary" onPress={() => handleOpenChange(true)}>
        {triggerText}
      </GenericButton>
      <Modal.Backdrop
        isDismissable={isDismissable}
        isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
      >
        <Modal.Container placement={placement} size={size}>
          <Modal.Dialog className={className}>
            <Modal.Header>
              <Modal.Heading>{title}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            {footer && <Modal.Footer>{footer}</Modal.Footer>}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
