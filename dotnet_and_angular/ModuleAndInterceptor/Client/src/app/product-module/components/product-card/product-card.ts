import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  private _router = inject(Router);
  private _productService = inject(ProductService);
  @Input() product: Product | null = null;

  public view(): void {
    this._productService.select(this.product);

    this._router.navigate([`/products/${this.product?.id}`]);
  }
}
