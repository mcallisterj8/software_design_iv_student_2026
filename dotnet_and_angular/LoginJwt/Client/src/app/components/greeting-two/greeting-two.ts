import { Component, inject, OnInit, signal } from '@angular/core';
import { GreetingService } from '../../services/greeting-service';

@Component({
  selector: 'app-greeting-two',
  imports: [],
  templateUrl: './greeting-two.html',
  styleUrl: './greeting-two.css',
})
export class GreetingTwo implements OnInit {
  private _greetingService = inject(GreetingService);

  public greeting = signal('');

  ngOnInit(): void {
    this._greetingService.greetingOne().subscribe((resp) => {
      this.greeting.set(resp.message);
    });
  }
}
