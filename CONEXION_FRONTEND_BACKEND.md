# 🔗 Guía de Verificación Frontend-Backend

## Estado Actual

✅ **Frontend Angular**: Corriendo en `http://localhost:4200`  
❌ **Backend NestJS**: NO está corriendo en `http://localhost:3000`

## Pasos para Conectar Frontend y Backend

### 1. Iniciar el Backend

Abre una terminal y ejecuta:

```bash
cd /home/coders/Escritorio/sportLineNest/riwi-sportsline
npm run start:dev
```

Deberías ver:
```
[Nest] 15051  - 26/11/2025, 8:26:45     LOG [NestApplication] Nest application successfully started
Application is running on: http://[::1]:3000
```

### 2. Verificar que el Backend esté Activo

En otra terminal, ejecuta:

```bash
curl http://localhost:3000/api
```

Deberías recibir: `Hello World!`

### 3. Crear un Usuario de Prueba

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

Respuesta esperada:
```json
{
  "id": "uuid-aqui",
  "email": "test@example.com",
  "isActive": true
}
```

### 4. Probar Login desde el Frontend

1. Abre el navegador en `http://localhost:4200`
2. Deberías ver la página de login con diseño púrpura
3. Ingresa:
   - **Email**: `test@example.com`
   - **Password**: `password123`
4. Click en **Login**
5. Si todo está bien, serás redirigido a `/products`

### 5. Verificar Productos

Si no hay productos, créalos desde Postman o curl:

```bash
# Primero, obtén el token haciendo login
TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  | jq -r '.accessToken')

# Crear un producto
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Nike Air Max",
    "description": "Comfortable running shoes",
    "price": 99.99,
    "stock": 50
  }'
```

## Verificación de CORS

El backend debe permitir peticiones desde `http://localhost:4200`. Verifica en `main.ts` del backend:

```typescript
// src/main.ts
app.enableCors({
  origin: 'http://localhost:4200',
  credentials: true
});
```

Si no está configurado, agrégalo antes de `await app.listen(port)`.

## Checklist de Verificación

- [ ] Backend corriendo en puerto 3000
- [ ] Frontend corriendo en puerto 4200
- [ ] Usuario registrado en la base de datos
- [ ] CORS habilitado en el backend
- [ ] Al menos un producto creado
- [ ] Login exitoso desde el frontend
- [ ] Redirección a /products
- [ ] Productos visibles en el catálogo

## Troubleshooting

### Error: "Failed to connect to localhost port 3000"
**Solución**: El backend no está corriendo. Ejecuta `npm run start:dev` en la carpeta del backend.

### Error: "CORS policy"
**Solución**: Agrega `app.enableCors()` en `main.ts` del backend.

### Error: "Invalid credentials"
**Solución**: Verifica que el usuario esté registrado o regístralo nuevamente.

### Error: "Cannot GET /"
**Solución**: El frontend usa `/api` como prefijo. Accede a `http://localhost:3000/api`.

### Productos no aparecen
**Solución**: Crea productos usando Postman, curl o Swagger (`http://localhost:3000/api/docs`).

## Flujo Completo de Prueba

```bash
# Terminal 1: Backend
cd /home/coders/Escritorio/sportLineNest/riwi-sportsline
npm run start:dev

# Terminal 2: Frontend
cd /home/coders/Escritorio/sportLineNest/riwi-sportsline-frontend
npm start

# Terminal 3: Crear datos de prueba
# Registrar usuario
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Login y obtener token
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}' \
  | jq -r '.accessToken')

# Crear productos
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Adidas Ultraboost","description":"Premium running shoes","price":149.99,"stock":30}'

curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Puma RS-X","description":"Retro style sneakers","price":89.99,"stock":45}'
```

## Navegador

1. Abre `http://localhost:4200`
2. Login con `admin@example.com` / `admin123`
3. Verás el catálogo con los productos creados

## ✅ Conexión Exitosa

Cuando todo funcione correctamente, verás:

1. **Login Page**: Formulario con validación
2. **Después del login**: Redirección automática a `/products`
3. **Products Page**: 
   - Header con email del usuario
   - Botón de logout
   - Grid de productos con tarjetas
   - Información de stock
   - Botones "Add to Cart"

![Login Page](file:///home/coders/.gemini/antigravity/brain/32f00b69-00e2-4815-aa57-a980ce03962c/login_page_empty_dom_1764165682264.png)

## Próximos Pasos

Una vez verificada la conexión:

- [ ] Implementar carrito de compras
- [ ] Crear órdenes desde el frontend
- [ ] Agregar búsqueda de productos
- [ ] Implementar paginación
- [ ] Agregar notificaciones (toasts)
