# Git Workflow - Feature Branches

Este proyecto sigue una estrategia de **Git Flow** con branches por funcionalidad.

## Estructura de Branches

```
main (producción)
  ├── develop (desarrollo)
  │   ├── feature/week1-nestjs-setup
  │   ├── feature/week2-orm-persistence
  │   ├── feature/week3-dtos-validation
  │   ├── feature/week4-middleware-interceptors
  │   ├── feature/week5-auth-jwt
  │   ├── feature/week6-advanced-auth
  │   └── feature/week7-swagger-docs
```

## Commits Realizados

### Feature: Week 1 - NestJS Setup
- Initial NestJS project setup
- Environment configuration
- TypeORM integration
- Base User entity

### Feature: Week 2 - ORM & Persistence
- Docker PostgreSQL setup
- Product, Client, Order entities
- Database relations
- Migrations and seeds

### Feature: Week 3 - DTOs & Validation
- DTOs with class-validator
- Global ValidationPipe
- CRUD services and controllers

### Feature: Week 4 - Middleware & Interceptors
- LoggerMiddleware
- HttpExceptionFilter
- RolesGuard
- Timeout and Transform interceptors

### Feature: Week 5 - Auth & JWT
- JWT authentication
- Refresh tokens
- Role and Permission entities
- Password hashing

### Feature: Week 6 - Advanced Auth
- API Key authentication
- Google OAuth2 integration

### Feature: Week 7 - Swagger Documentation
- Swagger UI setup
- API documentation decorators
- Postman collection

## Comandos Útiles

```bash
# Ver todas las branches
git branch -a

# Cambiar a una branch
git checkout feature/week5-auth-jwt

# Crear nueva branch
git checkout -b feature/nueva-funcionalidad

# Merge a develop
git checkout develop
git merge feature/week7-swagger-docs
```
