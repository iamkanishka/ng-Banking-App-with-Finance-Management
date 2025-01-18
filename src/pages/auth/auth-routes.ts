import { Routes } from '@angular/router';
import { SigninPageComponent } from './signin-page/signin-page.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    // canActivate: [NoUserLoggedGuard],
    component: SigninPageComponent,
  },
];
