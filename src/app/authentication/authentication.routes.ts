import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthenticationComponent,
    children: [
      {
        path: 'signin',
        loadComponent: () =>
          import('./signin/signin.component').then((m) => m.SigninComponent),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./signup/signup.component').then((m) => m.SignupComponent),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/auth/signin',
    pathMatch: 'full',
  },
];
