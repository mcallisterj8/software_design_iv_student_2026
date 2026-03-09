import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Item } from './components/item/item';
import { PageNotFound } from './components/page-not-found/page-not-found';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'about', component: About},
    {path: 'item/:itemId', component: Item},

    {path: '**', component: PageNotFound}
];
