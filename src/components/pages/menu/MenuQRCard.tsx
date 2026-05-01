"use client";

import { useState, useEffect } from "react";
import { QrCode, Download, X } from "lucide-react";
import QRCode from "qrcode";

interface MenuQRCardProps {
  tenantSlug: string;
}

export function MenuQRCard({ tenantSlug }: MenuQRCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const menuUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${tenantSlug}`
      : `/${tenantSlug}`;

  const generateQR = async () => {
    setLoading(true);
    try {
      const qr = await QRCode.toDataURL(menuUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
      setQrDataUrl(qr);
    } catch (error) {
      console.error("Error generating QR:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = `menu-qr-${tenantSlug}.png`;
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-surface p-6 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-soft">
            <QrCode className="h-5 w-5" strokeWidth={2.25} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold tracking-tight">Tu Menú Digital</p>
            <p className="truncate text-xs text-zinc-500">
              Comparte tu carta con un código QR
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => {
              setIsOpen(true);
              generateQR();
            }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <QrCode className="h-4 w-4" />
            Ver QR
          </button>
          <a
            href={`/${tenantSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-surface/70 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-surface"
          >
            Abrir Menú
          </a>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-2xl border border-[var(--border-soft)] bg-surface p-6 shadow-elevated">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-lg font-semibold tracking-tight">
              Código QR del Menú
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Escanea para ver tu carta digital
            </p>
            <div className="mt-4 flex flex-col items-center">
              {loading ? (
                <div className="h-64 w-64 flex items-center justify-center text-sm text-zinc-500">
                  Generando...
                </div>
              ) : qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="QR Code"
                  className="h-64 w-64 rounded-lg"
                />
              ) : null}
              <p className="mt-3 text-xs text-zinc-400">{menuUrl}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-full border border-[var(--border-soft)] bg-surface/70 px-4 py-2 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-surface"
              >
                Cerrar
              </button>
              <button
                onClick={downloadQR}
                disabled={!qrDataUrl}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                Descargar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
