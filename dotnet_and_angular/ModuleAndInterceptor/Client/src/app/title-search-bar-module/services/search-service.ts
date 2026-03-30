import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _searchQuerySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public searchQuery$: Observable<string> = this._searchQuerySubject.asObservable();

  public setSearchQuery(query: string): void {
    this._searchQuerySubject.next(query);
  }
}
