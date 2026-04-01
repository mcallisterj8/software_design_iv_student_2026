import { Component } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-unicast',
  imports: [],
  templateUrl: './unicast.html',
  styleUrl: './unicast.css',
})
export class Unicast {
  ngOnInit(): void {
    const unicastObservable$ = new Observable((subscriber: Subscriber<any>) => {
      // Simulate an asynchronous operation
      setTimeout(() => {
        // Emit a random value
        subscriber.next(Math.random());
      }, 1000);
    });

    // Subscribing to the Observable twice
    unicastObservable$.subscribe((value) => console.log(`Observable Subscriber 1: ${value}`));
    unicastObservable$.subscribe((value) => console.log(`Observable Subscriber 2: ${value}`));
  }
}
