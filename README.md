# La Llave Ferretería

Web app para una ferretería: catálogo público con cotizaciones por WhatsApp y panel de administración para gestionar productos, categorías, ofertas y contenido del sitio.

## Estado actual

**Frontend funcional con datos de prueba (mock).** El backend (base de datos, autenticación, subida de imágenes) se implementará después: las librerías de datos (`src/lib/products.ts`, `src/lib/settings.ts`) ya tienen las firmas finales, así que el cambio será interno.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4 (tokens de diseño en `globals.css`)
- React Hook Form + Zod (formularios)
- Lucide (iconos)

## Estructura

```
src/
  app/
    (tienda)/          # Página pública
      page.tsx         # Portada
      productos/       # Catálogo + detalle
    admin/             # Panel de administración
      page.tsx         # Dashboard
      productos/       # CRUD de productos
      categorias/      # CRUD de categorías
      configuracion/   # Contenido editable del sitio
  components/          # UI de la tienda y del admin
  data/catalog.ts      # Datos mock: categorías y productos
  lib/                 # utils, tipos, quote (WhatsApp)
```

## Datos de prueba

- `src/data/catalog.ts`: 7 categorías y 13 productos en USD.
- `src/lib/settings.ts`: textos editables (anuncio, hero, banner, WhatsApp).
- Las acciones del admin (`src/app/admin/actions.ts`) no persisten aún; solo validan el flujo de UI.

## Configuración

`.env`:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=5215512345678
```

Sin número, los botones de WhatsApp se ocultan (botón flotante) o quedan vacíos (cotización).

## Comandos

```bash
npm run dev     # desarrollo
npm run build   # build de producción
npm run lint    # eslint
```

## Pendiente (backend)

- Base de datos PostgreSQL (Neon) con Prisma: modelos `User`, `Category`, `Product`, `Setting`.
- Login de administrador (Auth.js) protegiendo `/admin`.
- Persistencia de productos/categorías/contenido y subida de imágenes (UploadThing).