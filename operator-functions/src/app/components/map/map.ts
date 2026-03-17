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

  // public map: boolean = false;
  // public data$: Observable<number[]> = this._dataService.data$.pipe(
  //   map((dataArr) => {
  //     // Note that this inner map() is the map() method on arrays in JavaScript,
  //     // not the RxJS map() function seen above.
  //     return dataArr.map((elem) => elem * 2);
  //   }),
  // );
}
