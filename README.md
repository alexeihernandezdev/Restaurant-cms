# Restaurant CMS

Sistema de gestión de menús digitales para restaurantes con soporte multi-inquilino, códigos QR y personalización de estilos.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: HeroUI v3 + Tailwind CSS v4
- **Base de datos**: PostgreSQL con Prisma ORM
- **Auth**: NextAuth.js v5
- **Testing**: Vitest + React Testing Library
- **Contenedores**: Docker + Docker Compose

## Requisitos

- Node.js 20+
- Docker y Docker Compose
- PostgreSQL 16 (o usar Docker)

## Instalación

### 1. Clonar y configurar entorno

```bash
# Clonar el repositorio
git clone <repo-url>
cd restaurant-cms

# Instalar dependencias
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/restaurant_cms"
NEXTAUTH_SECRET="tu-secret-key-aqui-minimo-32-caracteres"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Iniciar PostgreSQL con Docker

```bash
# Iniciar solo la base de datos
docker-compose up -d postgres

# O iniciar todos los servicios (bd + app)
docker-compose up -d
```

### 4. Configurar la base de datos

```bash
# Generar cliente Prisma
npm run db:generate

# Crear tablas en la base de datos
npm run db:push

# (Opcional) Ejecutar migraciones
npm run db:migrate

# (Opcional) Abrir Prisma Studio para ver datos
npm run db:studio
```

### 5. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Comandos Disponibles

| Comando               | Descripción                           |
| --------------------- | ------------------------------------- |
| `npm run dev`         | Iniciar servidor de desarrollo        |
| `npm run build`       | Construir aplicación para producción  |
| `npm run start`       | Iniciar servidor de producción        |
| `npm run lint`        | Ejecutar ESLint                       |
| `npm run test`        | Ejecutar tests en modo watch          |
| `npm run test:run`    | Ejecutar tests una vez                |
| `npm run test:ui`     | Ejecutar tests con interfaz visual    |
| `npm run db:generate` | Generar cliente Prisma                |
| `npm run db:push`     | Sincronizar schema con BD             |
| `npm run db:migrate`  | Ejecutar migraciones                  |
| `npm run db:studio`   | Abrir editor visual de BD             |
| `npm run db:seed`     | Poblar BD con datos de prueba         |
| `npx prisma`          | Ejecutar comandos Prisma directamente |

## Docker

### Estructura de servicios

- **postgres**: Base de datos PostgreSQL 16
- **app**: Aplicación Next.js (solo desarrollo)

### Comandos Docker

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs de un servicio
docker-compose logs -f postgres

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v
```

## Estructura del Proyecto

```
src/
├── app/                    # Páginas y rutas de Next.js
│   ├── (auth)/            # Rutas de autenticación
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/       # Panel de gestión CRM
│   │   ├── dishes/        # Gestión de platos
│   │   ├── categories/    # Gestión de categorías
│   │   ├── menu-styles/  # Estilos del menú
│   │   └── settings/      # Configuración
│   ├── [slug]/           # Menú público (QR)
│   └── api/              # API routes
├── components/            # Componentes React
│   ├── dashboard/
│   ├── dishes/
│   ├── categories/
│   ├── menu-styles/
│   └── menu/
├── lib/                  # Utilidades
│   ├── prisma.ts        # Cliente de BD
│   ├── auth.ts          # Configuración auth
│   └── tenant.ts        # Lógica multi-tenant
└── types/               # Definiciones TypeScript
```

## Rutas Principales

| Ruta                     | Descripción                |
| ------------------------ | -------------------------- |
| `/`                      | Página de inicio (landing) |
| `/login`                 | Iniciar sesión             |
| `/register`              | Registrar restaurante      |
| `/dashboard`             | Panel principal CRM        |
| `/dashboard/dishes`      | Gestión de platos          |
| `/dashboard/categories`  | Gestión de categorías      |
| `/dashboard/menu-styles` | Estilos del menú QR        |
| `/[slug]`                | Menú digital público       |

## API Endpoints

### Dishes

- `GET /api/dishes` - Listar platos
- `POST /api/dishes` - Crear plato
- `PUT /api/dishes/[id]` - Actualizar plato
- `DELETE /api/dishes/[id]` - Eliminar plato

### Categories

- `GET /api/categories` - Listar categorías
- `POST /api/categories` - Crear categoría
- `PUT /api/categories/[id]` - Actualizar categoría
- `DELETE /api/categories/[id]` - Eliminar categoría

### Menu Styles

- `PUT /api/menu-styles/[id]` - Actualizar estilos

### Upload

- `POST /api/upload` - Subir imagen

## Testing

```bash
# Ejecutar todos los tests
npm run test:run

# Tests con watch mode
npm run test

# Tests con UI visual
npm run test:ui
```

## Deployment

### Vercel (Recomendado)

1. Conectar repositorio con Vercel
2. Configurar variables de entorno en Vercel:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (URL de producción)
3. Desplegar

### Docker Self-hosted

```bash
# Construir imagen
docker build -t restaurant-cms .

# Ejecutar con PostgreSQL
docker-compose -f docker-compose.prod.yml up -d
```

## Licencia

MIT
