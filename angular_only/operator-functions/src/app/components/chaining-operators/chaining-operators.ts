import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Observable, tap, map, filter } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-chaining-operators',
  imports: [],
  templateUrl: './chaining-operators.html',
  styleUrl: './chaining-operators.css',
})
export class ChainingOperators {
  private _dataService = inject(DataService);
  public data: number[] = this._dataService.data;

  public tapData: WritableSignal<number[]> = signal<number[]>([]);
  public mapData: WritableSignal<number[]> = signal<number[]>([]);
  public filterData: WritableSignal<number[]> = signal<number[]>([]);

  public data$: Observable<number> = this._dataService.dataStream$.pipe(
    tap((elem) => {
      this.tapData.update((currentData) => {
        return [...currentData, elem];
      });

      /**
       * Uncomment the return to see that though no error will result
       * from returning from tap(), the value returned will always be
       * ignored downstream.
       */
      // return elem * 4;
    }),
    map((elem) => {
      /**
       * By making changes to the array in the mapData signal, we are breaking the
       * philosophy of map() of *not* causing side-effects; however, we are
       * adding to the array in the signal for the UI demonstration of seeing the
       * elements appear as they are processed.
       *
       * This also demonstrates that side-effects can be done - it just breaks the expected
       * behavior you are supposed to abide by for this function. The expected behavior
       * is that map() does not cause side-effects, but instead *only* effects the stream
       * of data it receives as a parameter, and *nothing* outside of this scope. This would
       * include *not* doing a console log in map() since this has effects outside of the scope
       * of this function.
       */
      this.mapData.update((currentData) => {
        return [...currentData, elem];
      });

      return elem * 2;
    }),
    filter((elem) => {
      /**
       * By making changes to the array in the filterData signal, we are breaking the
       * philosophy of filter() of *not* causing side-effects; however, we are
       * adding to the array in the signal for the UI demonstration of seeing the
       * elements appear as they are processed.
       *
       * This also demonstrates that side-effects can be done - it just breaks the expected
       * behavior you are supposed to abide by for this function. The expected behavior
       * is that filter() does not cause side-effects, but instead *only* effects the stream
       * of data it receives as a parameter, and *nothing* outside of this scope. This would
       * include *not* doing a console log in filter() since this has effects outside of the scope
       * of this function.
       */
      this.filterData.update((currentData) => {
        return [...currentData, elem];
      });

      return elem % 2 == 0;
    }),
  );

  public runChain(): void {
    this.data$.subscribe(() => {});
  }
}
