# Tienda de Café Artesanal - Avance de Proyecto

## Autor
JACOBO HENRIQUEZ
Repositorio: https://github.com/Jacobo27/taller-cafe.git

## Descripción del Proyecto
Este proyecto es un avance de una tienda en línea de café artesanal colombiano desarrollada con tecnologías modernas. La aplicación permite visualizar productos destacados y cuenta con la funcionalidad básica de un carrito de compras.

## Tecnologías Utilizadas
- **Frontend**:
  - Next.js 15
  - TypeScript
  - Tailwind CSS
  - Context API para manejo de estado

- **Backend**:
  - Express.js
  - Node.js
  - TypeScript

## Estructura del Proyecto
```
taller-cafe/
├── app/
│   ├── components/
│   │   ├── CoffeeCard.tsx    # Componente de tarjeta de producto
│   │   └── Header.tsx        # Barra de navegación
│   ├── context/
│   │   └── CartContext.tsx   # Contexto para el carrito de compras
│   ├── types/
│   │   └── index.ts         # Interfaces y tipos TypeScript
│   ├── layout.tsx           # Layout principal de la aplicación
│   └── page.tsx            # Página principal
├── public/
│   └── images/            # Imágenes de productos
├── server/
│   └── index.ts          # Servidor Express
└── README.md
```

## Funcionalidades Implementadas

### 1. Visualización de Productos
- Muestra de productos destacados en la página principal
- Imágenes optimizadas con Next.js Image
- Información detallada de cada producto:
  - Nombre del café
  - Descripción
  - Precio en COP (Pesos Colombianos)
  - Categoría

### 2. Carrito de Compras
- Implementación del contexto del carrito
- Funciones para:
  - Agregar productos
  - Remover productos
  - Actualizar cantidades
  - Calcular total

### 3. Diseño Responsivo
- Interfaz adaptable a diferentes dispositivos
- Estilos con Tailwind CSS
- Animaciones y transiciones suaves

## Backend (En Desarrollo)
- Servidor Express básico configurado
- Endpoints iniciales para:
  - Listar productos
  - Obtener producto por ID

## Instrucciones de Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/Jacobo27/taller-cafe.git
```

2. Instalar dependencias:
```bash
cd taller-cafe
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

4. Para el servidor backend (en otra terminal):
```bash
cd server
npx ts-node index.ts
```

Cómo ejecutar en desarrollo:

1. Instalar dependencias

```powershell
npm install
```

2. Ejecutar frontend y backend en paralelo (dev)

```powershell
npm run dev:all
```

Esto ejecuta Next.js (puerto 3000) y el backend Express (puerto 3001).

Notas:
- El backend es simple y no utiliza base de datos. Los datos de ejemplo están en `server/index.ts`.
- Si las imágenes remotas no cargan, `CoffeeCard` mostrará un placeholder en su lugar.

## Próximas Implementaciones
- [ ] Integración completa del backend
- [ ] Página de catálogo completo
- [ ] Filtros por categoría de café
- [ ] Sistema de autenticación
- [ ] Proceso de checkout
- [ ] Base de datos para productos
- [ ] Panel de administración

## Notas de Desarrollo
Este es un avance inicial que se centra en la estructura frontend y la experiencia de usuario. Se han implementado las bases necesarias para continuar con el desarrollo completo de la aplicación.
