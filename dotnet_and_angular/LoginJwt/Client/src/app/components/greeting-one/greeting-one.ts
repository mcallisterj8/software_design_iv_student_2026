import { Component, inject, OnInit, signal } from '@angular/core';
import { GreetingService } from '../../services/greeting-service';

@Component({
  selector: 'app-greeting-one',
  imports: [],
  templateUrl: './greeting-one.html',
  styleUrl: './greeting-one.css',
})
export class GreetingOne implements OnInit {
  private _greetingService = inject(GreetingService);

  public greeting = signal('');

  ngOnInit(): void {
    this._greetingService.greetingOne().subscribe((resp) => {
      this.greeting.set(resp.message);
    });
  }
}
