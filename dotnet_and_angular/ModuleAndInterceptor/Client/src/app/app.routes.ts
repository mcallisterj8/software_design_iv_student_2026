import { Routes } from '@angular/router';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'products',
    loadChildren: () =>
      import('./product-module/product-module-module').then((m) => m.ProductModuleModule),
  },

  { path: '**', redirectTo: '' },
];
