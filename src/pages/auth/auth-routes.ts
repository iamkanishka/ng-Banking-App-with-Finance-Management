import { Routes } from '@angular/router';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    // canActivate: [NoUserLoggedGuard],
    component: SigninPageComponent,
  },
  {
    path: 'sign-up',
    // canActivate: [NoUserLoggedGuard],
    component: SignupPageComponent,
  },
];
