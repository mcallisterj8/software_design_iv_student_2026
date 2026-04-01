import { Routes } from '@angular/router';
import { GreetingOne } from './components/greeting-one/greeting-one';
import { GreetingThree } from './components/greeting-three/greeting-three';
import { GreetingTwo } from './components/greeting-two/greeting-two';
import { authGuard } from './auth/guards/auth-guard';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule),
  },
  { path: 'greeting/one', component: GreetingOne, canActivate: [authGuard] },
  { path: 'greeting/two', component: GreetingTwo, canActivate: [authGuard] },
  { path: 'greeting/three', component: GreetingThree, canActivate: [authGuard] },

  { path: '**', redirectTo: '' },
];
