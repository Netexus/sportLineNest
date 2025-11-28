import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { ProductListComponent } from './features/products/product-list/product-list';
import { ClientsComponent } from './features/clients/clients.component';
import { OrdersComponent } from './features/orders/orders.component';
import { UsersComponent } from './features/users/users.component';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductListComponent, canActivate: [authGuard] },
    { path: 'clients', component: ClientsComponent, canActivate: [authGuard] },
    { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
    { path: 'users', component: UsersComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/products', pathMatch: 'full' }
];
