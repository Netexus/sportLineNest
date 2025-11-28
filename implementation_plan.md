# Plan de Implementación: Integración Frontend-Backend Completa

## Objetivo
Habilitar la gestión completa de Clientes, Órdenes y Usuarios desde el Frontend para permitir pruebas integrales sin Postman.

## Cambios Propuestos

### 1. Servicios (Core)
Crear servicios para comunicar con los endpoints del backend.
#### [NEW] [client.ts](file:///home/cohorte4/Escritorio/sportLineNest/riwi-sportsline-frontend/src/app/core/services/client.ts)
- Métodos: `getAll`, `getById`, `create`, `update`, `delete`.
- Endpoint: `/api/clients`

#### [NEW] [order.ts](file:///home/cohorte4/Escritorio/sportLineNest/riwi-sportsline-frontend/src/app/core/services/order.ts)
- Métodos: `getAll`, `getById`, `create`, `update`, `delete`.
- Endpoint: `/api/orders`

#### [NEW] [user.ts](file:///home/cohorte4/Escritorio/sportLineNest/riwi-sportsline-frontend/src/app/core/services/user.ts)
- Métodos: `getAll`, `getById`, `create`, `update`, `delete`.
- Endpoint: `/api/users`

### 2. Componentes (Features)
Crear componentes para listar y gestionar cada entidad.

#### [NEW] [clients.component.ts](file:///home/cohorte4/Escritorio/sportLineNest/riwi-sportsline-frontend/src/app/features/clients/clients.component.ts)
- Lista de clientes.
- Formulario simple para crear/editar.

#### [NEW] [orders.component.ts](file:///home/cohorte4/Escritorio/sportLineNest/riwi-sportsline-frontend/src/app/features/orders/orders.component.ts)
- Lista de órdenes.
- Formulario para crear orden.

#### [NEW] [users.component.ts](file:///home/cohorte4/Escritorio/sportLineNest/riwi-sportsline-frontend/src/app/features/users/users.component.ts)
- Lista de usuarios.
- Gestión de roles (si aplica).

### 3. Navegación y Rutas
#### [MODIFY] [app.routes.ts](file:///home/cohorte4/Escritorio/sportLineNest/riwi-sportsline-frontend/src/app/app.routes.ts)
- Agregar rutas `/clients`, `/orders`, `/users`.

#### [MODIFY] [app.html](file:///home/cohorte4/Escritorio/sportLineNest/riwi-sportsline-frontend/src/app/app.html)
- Agregar links en el menú de navegación.

## Verificación
- Navegar a cada sección.
- Crear, listar y eliminar elementos de cada tipo.
