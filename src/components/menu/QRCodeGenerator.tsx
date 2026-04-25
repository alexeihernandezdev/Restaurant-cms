"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { Modal } from "@heroui/react";
import QRCode from "qrcode";

interface QRCodeGeneratorProps {
  tenantSlug: string;
}

export function QRCodeGenerator({ tenantSlug }: QRCodeGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const generateQR = async () => {
    setLoading(true);
    try {
      const menuUrl = `${window.location.origin}/${tenantSlug}`;
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

  const handleOpen = () => {
    setIsOpen(true);
    generateQR();
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = `menu-qr-${tenantSlug}.png`;
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <>
      <Button variant="primary" className="shadow-lg" onPress={handleOpen}>
        Ver QR
      </Button>

      <Modal.Root isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop />
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Código QR del Menú</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col items-center">
                <p className="text-sm text-zinc-500 mb-4 text-center">
                  Escanea este código para ver el menú digital
                </p>
                {loading ? (
                  <div className="w-64 h-64 flex items-center justify-center">
                    Generando...
                  </div>
                ) : qrDataUrl ? (
                  <img src={qrDataUrl} alt="QR Code" className="w-64 h-64" />
                ) : null}
                <p className="mt-4 text-xs text-zinc-400">
                  URL:{" "}
                  {typeof window !== "undefined" ? window.location.origin : ""}/
                  {tenantSlug}
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" onPress={() => setIsOpen(false)}>
                Cerrar
              </Button>
              <Button
                variant="primary"
                onPress={downloadQR}
                isDisabled={!qrDataUrl}
              >
                Descargar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Root>
    </>
  );
}
