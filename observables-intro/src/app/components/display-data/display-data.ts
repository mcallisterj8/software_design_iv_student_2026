import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display-data',
  imports: [CommonModule],
  templateUrl: './display-data.html',
  styleUrl: './display-data.css',
})
export class DisplayData {
  private _apiService = inject(ApiService);
  public apiDataFromSubject$: Observable<any> = this._apiService.apiData$;
  ngOnInit(): void {
    // Uncomment below to have this component always retrieve data when the BehaviorSubject
    // is not filled.
    // if (!this._apiService.apiData) {
    //   this._apiService.webCallFillSubject().subscribe();
    // }
  }
}
