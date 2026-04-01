import { Component, inject, OnInit, signal } from '@angular/core';
import { GreetingService } from '../../services/greeting-service';

@Component({
  selector: 'app-greeting-three',
  imports: [],
  templateUrl: './greeting-three.html',
  styleUrl: './greeting-three.css',
})
export class GreetingThree implements OnInit {
  private _greetingService = inject(GreetingService);

  public greeting = signal('');

  ngOnInit(): void {
    this._greetingService.greetingOne().subscribe((resp) => {
      this.greeting.set(resp.message);
    });
  }
}
