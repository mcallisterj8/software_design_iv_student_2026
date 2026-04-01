import { Injectable } from '@angular/core';
import { filter, interval, map, Observable, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _data: number[] = [10, 11, 12, 13, 14, 15, 16];

  // Outputting data as a stream, one element at a time,
  // rather than the entire array at once.
  public dataStream$: Observable<number> = interval(500).pipe(
    take(this._data.length),
    map((index) => this._data[index]),
  );

  public data$: Observable<number[]> = of(this._data);

  constructor() {}

  public getDataStream(): Observable<number> {
    return this.dataStream$;
  }

  public getAllData(): Observable<number[]> {
    return this.data$;
  }

  public getDataAndManipulate(): Observable<number> {
    return this.dataStream$.pipe(
      tap((val) => {
        console.log('tap initial:', val);
      }),
      map((val) => {
        console.log('---------------------------------');
        console.log('map initial:', val);
        const retVal = val + 2;
        console.log('map return value:', retVal);

        return retVal;
      }),
      filter((val) => {
        console.log('---------------------------------');
        console.log('filter initial:', val);
        console.log('=================================');
        return val % 2 == 0;
      }),
    );
  }
}
