import { Component, inject, Input } from '@angular/core';
import { SearchService } from '../../services/search-service';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  private _searchService = inject(SearchService);

  public searchQuery: string = '';

  @Input() placeHolder: string = '';

  public search(): void {
    this._searchService.setSearchQuery(this.searchQuery);
  }
}
