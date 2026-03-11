import { Component } from '@angular/core';
import { Hero } from '../../models/hero';
import { HEROES } from '../../mock-data/hero-data';

@Component({
  selector: 'app-heroes',
  imports: [],
  templateUrl: './heroes.html',
  styleUrl: './heroes.css',
})
export class Heroes {
  public heroes: Hero[] = HEROES;
  public selectedHero: Hero | null = null;

}
