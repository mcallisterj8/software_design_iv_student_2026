import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Observable, scan } from 'rxjs';
import { DataService } from '../../services/data.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-pipe-and-operators',
  imports: [AsyncPipe],
  templateUrl: './pipe-and-operators.html',
  styleUrl: './pipe-and-operators.css',
})
export class PipeAndOperators implements OnInit {
  private _dataService = inject(DataService);
  public dataStream$: Observable<number> = this._dataService.dataStream$;
  public results: WritableSignal<number[]> = signal<number[]>([]);

  ngOnInit(): void {
    this.fillRegularArray();
  }

  public fillRegularArray(): void {
    this._dataService.getDataAndManipulate().subscribe((res) => {
      this.results.update((currentData) => {
        return [...currentData, res];
      });
    });
  }
}
