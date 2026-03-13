import { Component, inject } from '@angular/core';
import { Hero } from '../../models/hero';
import { HeroDbService } from '../../services/hero-db-service';
import { HeroDb } from '../../models/hero-db';
import { KeyValuePipe } from '@angular/common';
import { HeroDetails } from '../hero-details/hero-details';

@Component({
  selector: 'app-heroes',
  imports: [KeyValuePipe, HeroDetails],
  templateUrl: './heroes.html',
  styleUrl: './heroes.css',
})
export class Heroes {
  private heroDbService = inject(HeroDbService);

  // Using the service to load in all of the heroes, rather than having
  // the heroes hard-coded in this component.
  public heroesDbContents: HeroDb = this.heroDbService.loadDb();
  public selectedHero: Hero | null = null;

  public onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
