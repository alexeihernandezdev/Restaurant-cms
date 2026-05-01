"use client";

import { Modal } from "@heroui/react";
import { ReactNode, useState, type ComponentType } from "react";
import { X } from "lucide-react";
import { GenericButton } from "@components/atoms/button";
import type { GenericButtonProps } from "@components/atoms/button";

interface GenericModalProps {
  /** Text shown on the default trigger button. */
  triggerText?: string;
  /** Optional icon for the trigger button (lucide-style icon component). */
  triggerIcon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Visual variant of the default trigger button. */
  triggerVariant?: GenericButtonProps["variant"];
  /** Custom trigger element (overrides triggerText/triggerIcon). */
  trigger?: ReactNode;
  /** Modal title shown in the header. */
  title: string;
  /** Optional descriptive subtitle shown beneath the title. */
  description?: string;
  /** Decorative icon shown in the header (lucide-style icon component). */
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Tailwind classes for the header icon container (background + text color). */
  iconClass?: string;
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

const CONTAINER_ANIMATION = [
  "data-[entering]:animate-in",
  "data-[entering]:fade-in-0",
  "data-[entering]:zoom-in-95",
  "data-[entering]:slide-in-from-bottom-6",
  "data-[entering]:duration-300",
  "data-[entering]:ease-[cubic-bezier(0.16,1,0.3,1)]",
  "data-[exiting]:animate-out",
  "data-[exiting]:fade-out-0",
  "data-[exiting]:zoom-out-95",
  "data-[exiting]:duration-150",
  "data-[exiting]:ease-[cubic-bezier(0.7,0,0.84,0)]",
].join(" ");

const BACKDROP_ANIMATION = [
  "data-[entering]:animate-in",
  "data-[entering]:fade-in-0",
  "data-[entering]:duration-300",
  "data-[exiting]:animate-out",
  "data-[exiting]:fade-out-0",
  "data-[exiting]:duration-150",
].join(" ");

export function GenericModal({
  triggerText = "Open Modal",
  triggerIcon: TriggerIcon,
  triggerVariant = "primary",
  trigger,
  title,
  description,
  icon: Icon,
  iconClass = "bg-gradient-brand text-white shadow-glow",
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
      {trigger ?? (
        <GenericButton
          variant={triggerVariant}
          onPress={() => handleOpenChange(true)}
          className="inline-flex items-center gap-2"
        >
          {TriggerIcon && <TriggerIcon className="h-4 w-4" strokeWidth={2.5} />}
          {triggerText}
        </GenericButton>
      )}
      <Modal.Backdrop
        variant="blur"
        isDismissable={isDismissable}
        isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        className={`bg-zinc-950/50 backdrop-blur-md ${BACKDROP_ANIMATION}`}
      >
        <Modal.Container
          placement={placement}
          size={size}
          className={CONTAINER_ANIMATION}
        >
          <Modal.Dialog
            className={`group relative overflow-hidden rounded-3xl border border-[var(--border-soft)] bg-surface shadow-elevated ${className ?? ""}`}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-mesh opacity-80"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-brand"
            />

            <Modal.CloseTrigger className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface/70 text-zinc-500 backdrop-blur transition-all hover:scale-105 hover:bg-surface hover:text-foreground active:scale-95 data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-2 data-[focus-visible=true]:ring-primary-500/50">
              <X className="h-4 w-4" strokeWidth={2.5} />
            </Modal.CloseTrigger>

            <Modal.Header className="relative flex items-start gap-3 px-6 pt-6 pb-5">
              {Icon && (
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconClass}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2.25} />
                </div>
              )}
              <div className="min-w-0 flex-1 pr-10">
                <Modal.Heading className="text-lg font-semibold tracking-tight text-foreground">
                  {title}
                </Modal.Heading>
                {description && (
                  <p className="mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {description}
                  </p>
                )}
              </div>
            </Modal.Header>

            <div
              aria-hidden
              className="relative mx-6 h-px bg-gradient-to-r from-transparent via-[var(--border-soft)] to-transparent"
            />

            <Modal.Body className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5">
              {children}
            </Modal.Body>

            {footer && (
              <Modal.Footer className="relative flex w-full shrink-0 flex-col-reverse gap-2 border-t border-[var(--border-soft)] bg-surface px-6 py-5 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
                {footer}
              </Modal.Footer>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
