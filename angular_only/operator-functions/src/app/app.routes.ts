import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Map } from './components/map/map';
import { Tap } from './components/tap/tap';
import { Filter } from './components/filter/filter';
import { ChainingOperators } from './components/chaining-operators/chaining-operators';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  { path: 'map', component: Map },
  { path: 'tap', component: Tap },
  { path: 'filter', component: Filter },
  { path: 'chaining-operators', component: ChainingOperators },

  { path: '**', redirectTo: '' },
];
