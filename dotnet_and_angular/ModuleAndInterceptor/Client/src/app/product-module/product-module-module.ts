import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';

import { ProductModuleRoutingModule } from './product-module-routing-module';
import { NameSearchPipe } from './pipes/name-search-pipe';
import { Products } from './components/products/products';
import { ProductDetails } from './components/product-details/product-details';
import { ProductCard } from './components/product-card/product-card';
import { TitleSearchBarModule } from '../title-search-bar-module/title-search-bar-module';

@NgModule({
  declarations: [NameSearchPipe, Products, ProductDetails, ProductCard],
  imports: [
    CommonModule,
    ProductModuleRoutingModule,
    AsyncPipe,
    CurrencyPipe,
    TitleSearchBarModule,
  ],
  exports: [Products, ProductDetails, ProductCard],
})
export class ProductModuleModule {}
