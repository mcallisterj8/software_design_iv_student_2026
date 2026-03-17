import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _dataSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

  public data$: Observable<number[]> = this._dataSubject.asObservable();

  public dataStream$: Observable<number> = interval(500).pipe(
    take(this._dataSubject.value.length),
    map((index) => this._dataSubject.value[index]),
  );

  constructor() {}

  public get data(): number[] {
    return this._dataSubject.value;
  }
}
