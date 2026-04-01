import { Component } from '@angular/core';
import { Hero } from '../../models/hero';
import { HEROES } from '../../mock-data/hero-data';
import { HeroDetails } from '../hero-details/hero-details';

@Component({
  selector: 'app-heroes',
  imports: [HeroDetails],
  templateUrl: './heroes.html',
  styleUrl: './heroes.css',
})
export class Heroes {
  public heroes: Hero[] = HEROES;
  public selectedHero: Hero | null = null;

  public onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
