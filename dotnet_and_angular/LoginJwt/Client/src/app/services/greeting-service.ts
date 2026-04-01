import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Greeting } from '../models/greeting';

@Injectable({
  providedIn: 'root',
})
export class GreetingService {
  private _http = inject(HttpClient);

  public greetingOne(): Observable<Greeting> {
    return this._http.get<Greeting>(`/api/greeting/one`);
  }

  public greetingTwo(): Observable<Greeting> {
    return this._http.get<Greeting>(`/api/greeting/two`);
  }

  public greetingThree(): Observable<Greeting> {
    return this._http.get<Greeting>(`/api/greeting/three`);
  }
}
