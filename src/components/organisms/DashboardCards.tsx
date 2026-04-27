"use client";

import { Card, Button } from "@heroui/react";
import { Cookie, Bookmark, Eye, ArrowRight, Plus, FolderPlus, Palette } from "lucide-react";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  variant?: "default" | "secondary" | "tertiary";
}

function StatCard({ title, value, description, icon, variant = "default" }: StatCardProps) {
  return (
    <Card variant={variant} className="py-6 px-4">
      <Card.Header className="flex-row items-center gap-4">
        <div className="p-3 rounded-xl bg-primary/10">
          {icon}
        </div>
        <div className="flex flex-col">
          <Card.Title className="text-large font-medium">{title}</Card.Title>
          {description && (
            <Card.Description className="text-small text-default-500">
              {description}
            </Card.Description>
          )}
        </div>
      </Card.Header>
      <Card.Content className="pt-0">
        <p className="text-4xl font-bold text-foreground">{value}</p>
      </Card.Content>
      <Card.Footer className="pt-0 pb-0 px-0">
        <Button variant="ghost" size="sm" className="text-default-400">
          Ver detalles
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </Card.Footer>
    </Card>
  );
}

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function QuickAction({ title, description, icon, href }: QuickActionProps) {
  return (
    <Link href={href} className="block cursor-pointer">
      <Card variant="secondary" className="py-5 px-5 h-full transition-colors hover:bg-secondary/50">
        <Card.Header className="flex-row items-center gap-4 p-0">
          <div className="p-3 rounded-xl bg-secondary/20">
            {icon}
          </div>
          <div className="flex flex-col">
            <Card.Title className="text-base font-semibold">{title}</Card.Title>
            <Card.Description className="text-small">{description}</Card.Description>
          </div>
        </Card.Header>
        <Card.Footer className="p-0 pt-4">
          <Button variant="ghost" size="sm" className="w-fit p-0 h-auto text-secondary-foreground">
            Ir ahora
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Card.Footer>
      </Card>
    </Link>
  );
}

interface DashboardCardsProps {
  dishCount: number;
  categoryCount: number;
  menuVisits?: number;
}

export function DashboardCards({ dishCount, categoryCount, menuVisits = 0 }: DashboardCardsProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Estadísticas</h2>
          <p className="text-default-500 text-small mt-1">Resumen de tu restaurante</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total de Platos"
          value={dishCount}
          description="Platos en tu menú"
          icon={<Cookie className="w-6 h-6 text-primary" />}
          variant="default"
        />
        <StatCard
          title="Categorías"
          value={categoryCount}
          description="Categorías activas"
          icon={<Bookmark className="w-6 h-6 text-primary" />}
          variant="secondary"
        />
        <StatCard
          title="Visitas al Menú"
          value={menuVisits}
          description="Veces que han visto tu menú"
          icon={<Eye className="w-6 h-6 text-primary" />}
          variant="tertiary"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickAction
            title="Agregar Plato"
            description="Nuevo platillo a tu menú"
            icon={<Plus className="w-6 h-6 text-secondary-foreground" />}
            href="/dashboard/dishes"
          />
          <QuickAction
            title="Crear Categoría"
            description="Organiza tu menú"
            icon={<FolderPlus className="w-6 h-6 text-secondary-foreground" />}
            href="/dashboard/categories"
          />
          <QuickAction
            title="Ver Menú"
            description="Vista previa pública"
            icon={<Eye className="w-6 h-6 text-secondary-foreground" />}
            href="/menu"
          />
          <QuickAction
            title="Configurar Estilos"
            description="Personaliza tu menú"
            icon={<Palette className="w-6 h-6 text-secondary-foreground" />}
            href="/dashboard/menu-styles"
          />
        </div>
      </div>
    </div>
  );
}