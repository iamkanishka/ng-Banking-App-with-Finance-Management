import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../components/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../pages/auth/auth-routes').then((r) => r.AUTH_ROUTES),
      },
    ],
  },
];
