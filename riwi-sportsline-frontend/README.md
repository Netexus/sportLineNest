# Riwi SportsLine - Angular Frontend

Frontend application for Riwi SportsLine e-commerce built with Angular 19.

## Features

- ✅ **Authentication**: Login with JWT tokens
- ✅ **Product Catalog**: Browse available products
- ✅ **Protected Routes**: Auth guard for secure pages
- ✅ **HTTP Interceptors**: Automatic token injection
- ✅ **Reactive Forms**: Form validation
- ✅ **Modern UI**: Gradient design with animations

## Tech Stack

- **Angular 19** (Standalone Components)
- **TypeScript**
- **SCSS** for styling
- **RxJS** for reactive programming
- **Angular Router** for navigation
- **HttpClient** for API calls

## Project Structure

```
src/app/
├── core/
│   ├── guards/
│   │   └── auth-guard.ts          # Route protection
│   ├── interceptors/
│   │   └── auth-interceptor.ts    # JWT token injection
│   └── services/
│       ├── auth.ts                # Authentication service
│       └── product.ts             # Product service
├── features/
│   ├── auth/
│   │   └── login/                 # Login component
│   └── products/
│       └── product-list/          # Product catalog
├── app.config.ts                  # App configuration
├── app.routes.ts                  # Route definitions
└── app.ts                         # Root component
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:3000`

### Installation

```bash
cd riwi-sportsline-frontend
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200`

### Build

```bash
npm run build
```

## API Integration

The frontend connects to the NestJS backend API:

- **Base URL**: `http://localhost:3000/api`
- **Auth Endpoints**: `/auth/login`, `/auth/register`, `/auth/profile`
- **Product Endpoints**: `/products`

## Authentication Flow

1. User enters credentials in login form
2. `AuthService` sends POST to `/auth/login`
3. Backend returns `accessToken` and `refreshToken`
4. Tokens stored in `localStorage`
5. `AuthInterceptor` adds token to all HTTP requests
6. `AuthGuard` protects routes requiring authentication

## Features Implemented

### Login Component
- Email and password validation
- Error handling
- Loading states
- Responsive design

### Product List Component
- Display all products
- Product cards with:
  - Name, description, price
  - Stock availability
  - Add to cart button
- User info and logout
- Loading and error states

### Services

#### AuthService
- `login(email, password)`: Authenticate user
- `logout()`: Clear tokens and redirect
- `isAuthenticated()`: Check auth status
- `currentUser$`: Observable of current user

#### ProductService
- `getAll()`: Fetch all products
- `getById(id)`: Fetch single product
- `create(product)`: Create product
- `update(id, product)`: Update product
- `delete(id)`: Delete product

## Styling

- **Design System**: Gradient purple theme
- **Responsive**: Mobile-first approach
- **Animations**: Smooth transitions and hover effects
- **Components**: Card-based layout

## Next Steps

- [ ] Add shopping cart functionality
- [ ] Implement order creation
- [ ] Add product search and filters
- [ ] User profile page
- [ ] Admin dashboard
- [ ] Product detail page
- [ ] Checkout process

## License

MIT
