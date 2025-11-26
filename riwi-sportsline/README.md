# Riwi SportsLine - NestJS Migration

## Description
This project is a migration of the Riwi SportsLine e-commerce backend from Express to NestJS.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Environment Variables
Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

## Database
The project uses TypeORM with PostgreSQL. Ensure you have a PostgreSQL instance running and configured in `.env`.

## Project Structure
- `src/users`: User module and entity.
- `src/config`: Configuration (using @nestjs/config).

## Migration Status
- [x] Week 1: Fundamentals & Setup
  - NestJS CLI initialization
  - ConfigModule setup
  - TypeORM integration
  - Base User entity
