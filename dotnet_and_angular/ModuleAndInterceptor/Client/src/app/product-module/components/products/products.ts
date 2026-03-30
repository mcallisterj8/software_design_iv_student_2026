import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { SearchService } from '../../../title-search-bar-module/services/search-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private _productService = inject(ProductService);
  private _searchService = inject(SearchService);
  // By virtue of having this & how the getAllProducts() is implemented,
  // we will have access to all products once our http call successfully returns.
  public productList$ = this._productService.productList$;
  public searchQuery$: Observable<string> = this._searchService.searchQuery$;

  ngOnInit(): void {
    // Do not forget to subscribe()
    this._productService.getAllProducts().subscribe();
  }
}
