import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, EMPTY, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-request-data',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './request-data.html',
  styleUrl: './request-data.css',
})
export class RequestData {
  private _apiService = inject(ApiService);
  public apiDataFromSubject$: Observable<any> = this._apiService.apiData$;

  public apiDataFromComp$: Observable<any> = EMPTY;
  public apiDataFromSubjectLoading: boolean = false;
  public apiDataFromCompLoading: boolean = false;

  ngOnInit(): void {}

  getApiData(): void {
    // this._dataService.webCall();
    this.apiDataFromCompLoading = true;
    this.apiDataFromComp$ = this._apiService.webCall().pipe(
      tap(() => {
        this.apiDataFromCompLoading = false;
      }),
    );
  }

  getApiDataAndDisplayJson(): void {
    // this._dataService.webCall();
    this.apiDataFromSubjectLoading = true;
    this._apiService.webCallFillSubject().subscribe((res) => {
      this.apiDataFromSubjectLoading = false;
    });
  }

  public clear(): void {
    this._apiService.clearData();
  }
}
