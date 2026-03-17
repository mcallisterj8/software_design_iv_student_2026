import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-async-pipe-example',
  imports: [AsyncPipe],
  templateUrl: './async-pipe-example.html',
  styleUrl: './async-pipe-example.css',
})
export class AsyncPipeExample implements OnInit {
  private _dataService = inject(DataService);

  public dataArr$: Observable<number[]> = new Observable<number[]>();

  ngOnInit(): void {
    // No subscription here as the async pipe in the html will subscribe.
    this.dataArr$ = this._dataService.getAllData();
  }
}
