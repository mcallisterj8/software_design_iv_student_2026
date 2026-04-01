import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  private _dataService = inject(DataService);

  public data: number[] = this._dataService.data;

  public filteredData: WritableSignal<number[]> = signal<number[]>([]);

  public data$: Observable<number> = this._dataService.dataStream$.pipe(
    filter((elem) => {
      return elem % 2 === 0;
    }),
  );

  public runFilter(): void {
    this.data$.subscribe((elem) => {
      /**
       * filteredData is a signal.
       *
       * We update it with update(), which gives us access to the current
       * value already stored in the signal.
       *
       * Angular tracks signals that are used in the template. When this
       * signal is updated, Angular automatically refreshes the UI anywhere
       * that reads filteredData().
       */
      this.filteredData.update((currentData) => {
        return [...currentData, elem];
      });
    });
  }
}
