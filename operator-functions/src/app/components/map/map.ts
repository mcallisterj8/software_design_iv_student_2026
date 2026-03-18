import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {
  private _dataService = inject(DataService);

  public data: number[] = this._dataService.data;

  public mappedData: WritableSignal<number[]> = signal<number[]>([]);

  public data$: Observable<number> = this._dataService.dataStream$.pipe(
    map((elem) => {
      return elem * 2;
    }),
  );

  public runMap(): void {
    this.data$.subscribe((elem) => {
      /**
       * mappedData is a signal.
       *
       * We update it with update(), which gives us access to the current
       * value already stored in the signal.
       *
       * Angular tracks signals that are used in the template. When this
       * signal is updated, Angular automatically refreshes the UI anywhere
       * that reads mappedData().
       */
      this.mappedData.update((currentData) => {
        return [...currentData, elem];
      });
    });
  }
}
