import { Routes } from '@angular/router';
import { SignInComponent } from './pages/public/sign-in/sign-in.component';
import { HomeComponent } from './pages/public/home/home.component';
import { DashboardComponent } from './pages/private/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth-guard';
import { publicGuard } from './core/guards/public-guard';
import { NotFoundComponent } from './pages/public/not-found/not-found.component';
import { TransactionsComponent } from './pages/private/transactions/transactions.component';
import { CustomersEditorComponent } from './pages/private/customers/views/customers-editor/customers-editor.component';
import { CustomersTableComponent } from './pages/private/customers/views/customers-table/customers-table.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [publicGuard],
    component: HomeComponent,
  },
  {
    path: 'sign-in',
    canActivate: [publicGuard],
    component: SignInComponent,
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  {
    path: 'transactions',
    canActivate: [authGuard],
    component: TransactionsComponent,
  },
  {
    path: 'customers/:id',
    canActivate: [authGuard],
    component: CustomersEditorComponent,
  },
  {
    path: 'customers/new',
    canActivate: [authGuard],
    component: CustomersEditorComponent,
  },
  {
    path: 'customers',
    canActivate: [authGuard],
    component: CustomersTableComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
