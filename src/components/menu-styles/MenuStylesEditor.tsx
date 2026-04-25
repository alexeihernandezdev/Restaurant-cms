"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateMenuStyle } from "@lib/api/menu-styles";

const TEMPLATES = [
  { key: "classic", label: "Clásico" },
  { key: "modern", label: "Moderno" },
  { key: "minimal", label: "Minimalista" },
  { key: "rustic", label: "Rústico" },
];

const FONTS = [
  { key: "inter", label: "Inter" },
  { key: "playfair", label: "Playfair Display" },
  { key: "lora", label: "Lora" },
  { key: "roboto", label: "Roboto" },
];

interface MenuStyle {
  id: string;
  template: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  logoUrl: string | null;
  coverImageUrl: string | null;
}

export function MenuStylesEditor({ menuStyle }: { menuStyle: MenuStyle }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    template: menuStyle.template,
    primaryColor: menuStyle.primaryColor,
    secondaryColor: menuStyle.secondaryColor,
    accentColor: menuStyle.accentColor,
    fontFamily: menuStyle.fontFamily,
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateMenuStyle(menuStyle.id, formData);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Estilos del Menú</h1>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50 transition-colors"
        >
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Plantilla</h2>
          <select
            value={formData.template}
            onChange={(e) =>
              setFormData({ ...formData, template: e.target.value })
            }
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md dark:bg-zinc-900"
          >
            {TEMPLATES.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Colores</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Color Primario
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) =>
                    setFormData({ ...formData, primaryColor: e.target.value })
                  }
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.primaryColor}
                  onChange={(e) =>
                    setFormData({ ...formData, primaryColor: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md dark:bg-zinc-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Color Secundario
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="color"
                  value={formData.secondaryColor}
                  onChange={(e) =>
                    setFormData({ ...formData, secondaryColor: e.target.value })
                  }
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.secondaryColor}
                  onChange={(e) =>
                    setFormData({ ...formData, secondaryColor: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md dark:bg-zinc-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Color de Acento
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="color"
                  value={formData.accentColor}
                  onChange={(e) =>
                    setFormData({ ...formData, accentColor: e.target.value })
                  }
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.accentColor}
                  onChange={(e) =>
                    setFormData({ ...formData, accentColor: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md dark:bg-zinc-900"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Tipografía</h2>
          <select
            value={formData.fontFamily}
            onChange={(e) =>
              setFormData({ ...formData, fontFamily: e.target.value })
            }
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md dark:bg-zinc-900"
          >
            {FONTS.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Vista Previa</h2>
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: formData.secondaryColor,
              fontFamily: formData.fontFamily,
            }}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: formData.primaryColor }}
            >
              Menú de Ejemplo
            </h3>
            <div
              className="inline-block px-3 py-1 rounded text-sm"
              style={{
                backgroundColor: formData.accentColor,
                color: formData.primaryColor,
              }}
            >
              Categoría Destacada
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
