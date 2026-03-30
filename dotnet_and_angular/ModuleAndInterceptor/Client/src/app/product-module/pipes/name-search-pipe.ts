import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'nameSearch',
  standalone: false,
})
export class NameSearchPipe implements PipeTransform {
  transform(productList: Product[] | null, searchQuery: string | null = ''): Product[] {
    if (!productList) {
      return [];
    }

    if (!searchQuery?.trim()) {
      // If no search query, return the original list
      return productList;
    }

    // Return the filtered list
    return productList.filter((product) =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }
}
