me LLAMO MILTON
# 🛒 E-Commerce Fullstack — NestJS + Next.js

> **Nota del Tech Lead (TL):**  
> Este proyecto implementa una arquitectura desacoplada y moderna para una plataforma de comercio electrónico sencilla. El backend maneja la lógica de negocio y exposición de datos mediante una API RESTful con **NestJS**, mientras que el frontend ofrece una interfaz rápida, reactiva y atractiva con **Next.js (App Router)** y **Tailwind CSS**. Todo gestionado con el gestor de paquetes **pnpm**.

---

## 🏛️ 1. Arquitectura General

```
backmasfront/
├── backend/                  # API RESTful con NestJS (Puerto 4000)
│   ├── src/
│   │   ├── products/         # Módulo de productos (Controller, Service, Interfaces)
│   │   ├── app.module.ts     # Módulo raíz
│   │   └── main.ts           # Punto de entrada, prefijo /api y CORS
│   └── package.json
│
├── frontend/                 # Aplicación Web con Next.js + React (Puerto 3000)
│   ├── app/
│   │   ├── layout.tsx        # Layout global y metadatos
│   │   ├── page.tsx          # Pantalla principal (Catálogo y lógica de estado)
│   │   └── globals.css       # Estilos base con Tailwind
│   ├── components/           # Componentes modulares (Navbar, Hero, ProductCard, CartDrawer)
│   ├── types/                # Tipos TypeScript compartidos (Product, CartItem)
│   ├── next.config.mjs       # Configuración de Next.js y CDN de imágenes
│   └── package.json
│
└── README.md                 # Esta documentación
```

---

## 🚀 2. Guía de Ejecución Rápida

Ambos servicios deben correr por separado en terminales independientes.

### Requisitos Previos
- **Node.js** (v18+)
- **pnpm** (recomendado por velocidad y seguridad en dependencias)

### Terminal 1 — Backend (NestJS)
```powershell
cd backend
pnpm install
pnpm run start:dev
```
- **URL Base:** `http://localhost:4000/api`
- **Health Check:** `http://localhost:4000/api/products`

### Terminal 2 — Frontend (Next.js)
```powershell
cd frontend
pnpm install
pnpm run dev
```
- **Aplicación Web:** `http://localhost:3000`

---

## 🔌 3. Endpoints de la API RESTful (Backend)

La API cuenta con prefijo global `/api` y CORS habilitado para solicitudes cruzadas:

| Método | Endpoint | Parámetros / Body | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | `?category=Audio` & `?search=term` | Lista todos los productos, con soporte opcional para filtros y búsqueda. |
| `GET` | `/api/products/categories` | Ninguno | Retorna el arreglo de categorías únicas del catálogo. |
| `GET` | `/api/products/:id` | `:id` (en ruta) | Devuelve el detalle de un producto individual por su ID. |
| `POST` | `/api/products/checkout` | `{ items: [{ productId, quantity, price }] }` | Procesa la compra y genera un ID de pedido (`ORD-XXXXX`). |

---

## 🖼️ 4. Gestión de Imágenes y Recursos

- **Origen:** Se utiliza la CDN pública de **Unsplash** (`images.unsplash.com`). Son imágenes reales en alta resolución libres de derechos para gadgets, audio, laptops y periféricos.
- **Optimización:** En `frontend/next.config.mjs` se configuró `images.remotePatterns` para que el componente nativo `<Image />` de Next.js optimice el formato, peso y resolución automáticamente.

---

## ✨ 5. Características de la Pantalla Principal (Frontend)

- **Hero Banner:** Sección visual moderna con propuesta de valor y acceso directo al catálogo.
- **Filtros Dinámicos:** Selector de categorías con pastillas activas.
- **Búsqueda en Tiempo Real:** Barra de búsqueda responsiva que filtra por título o descripción.
- **Catálogo Interactivo:** Tarjetas con badges de oferta/novedad, cálculo de ahorro, rating con estrellas y control de stock.
- **Carrito Desplegable (Slide-over Drawer):**
  - Agregar/quitar productos.
  - Modificar cantidades (+ / -).
  - Cálculo automático de subtotal y envío gratis.
  - Botón de checkout conectado directamente con el endpoint `POST /api/products/checkout`.
- **Notificaciones Toast:** Feedback visual instantáneo al añadir productos.
- **Modo Resiliente:** Si el backend está apagado o reiniciándose, la UI muestra un indicador de estado y conmuta a datos de respaldo para no romper la experiencia de usuario.

---

## 📋 6. Recomendaciones del TL para la Siguiente Fase

Para evolucionar este proyecto a un entorno de producción, los siguientes pasos sugeridos son:
1. **Persistencia:** Integrar base de datos (PostgreSQL con Prisma o TypeORM en NestJS).
2. **Autenticación:** Implementar login con JWT o NextAuth / Auth0.
3. **Pagos Reales:** Conectar el endpoint de checkout con pasarelas como Stripe o Mercado Pago.
4. **Testing:** Añadir pruebas unitarias con Jest para el backend y Playwright/Vitest para el frontend.
