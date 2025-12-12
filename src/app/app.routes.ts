import { Routes } from '@angular/router';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectToUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectAuthorizedToHome = () => redirectLoggedInTo(['tabs']);
export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./authentication/authentication.routes').then((m) => m.routes),
    ...canActivate(redirectAuthorizedToHome),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    ...canActivate(redirectToUnauthorizedToLogin),
  },
  {
    path: 'loading',
    component: LoadingPageComponent,
  },
];
