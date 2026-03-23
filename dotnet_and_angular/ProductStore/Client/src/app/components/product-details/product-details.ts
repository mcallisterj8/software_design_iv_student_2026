import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, EMPTY } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product-service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  private _route = inject(ActivatedRoute);
  private _productService = inject(ProductService);
  public product$: Observable<Product | null> = this._productService.product$;

  public productTest: Product | null = this._productService.product;

  ngOnInit(): void {
    if (!this._productService.product) {
      this.getProductFromRoute().subscribe();
    }
  }

  public getProductFromRoute(): Observable<Product> {
    return this._route.paramMap.pipe(
      switchMap((params) => {
        const productId = +(params.get('productId') ?? -1);

        if (productId) {
          return this._productService.getProductById(productId);
        }

        return EMPTY;
      }),
    );
  }

  public changeSubject(): void {
    const product = {
      id: 80,
      name: 'Example',
      description: 'Nothing to see here.',
      price: 8000,
      isAvailable: true,
    };

    this._productService.select(product);
  }
}
