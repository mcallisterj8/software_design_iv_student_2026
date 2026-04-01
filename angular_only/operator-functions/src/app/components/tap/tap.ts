import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-tap',
  imports: [],
  templateUrl: './tap.html',
  styleUrl: './tap.css',
})
export class Tap {
  private _dataService = inject(DataService);

  public data: number[] = this._dataService.data;

  public messageA: WritableSignal<string> = signal<string>('');
  public messageB: WritableSignal<string> = signal<string>('');

  public tapData: WritableSignal<number[]> = signal<number[]>([]);
  public secondaryTapData: WritableSignal<number[]> = signal<number[]>([]);

  public dataA$: Observable<number> = this._dataService.dataStream$.pipe(
    tap((elem) => {
      this.messageA.set(`Processing ${elem}`);

      this.tapData.update((currentData) => {
        return [...currentData, elem];
      });
    }),
  );

  public dataB$: Observable<number> = this._dataService.dataStream$.pipe(
    tap((elem) => {
      this.messageB.set(`Processing ${elem}`);

      this.secondaryTapData.update((currentData) => {
        return [...currentData, elem];
      });

      return elem * 2;
    }),
  );

  public runExampleA(): void {
    this.dataA$.subscribe();
  }

  public runExampleB(): void {
    this.dataB$.subscribe();
  }
}
