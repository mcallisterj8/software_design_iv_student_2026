import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductCard } from '../product-card/product-card';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [AsyncPipe, ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private _productService = inject(ProductService);
  // By virtue of having this & how the getAllProducts() is implemented,
  // we will have access to all products once our http call successfully returns.
  public productList$ = this._productService.productList$;

  ngOnInit(): void {
    // Do not forget to subscribe()
    this._productService.getAllProducts().subscribe();
  }
}
