import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Heroes } from './components/heroes/heroes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Heroes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tour-of-heroes-basic');
}
