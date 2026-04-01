import { Injectable } from '@angular/core';
import { HeroDb } from '../models/hero-db';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root',
})
export class HeroDbService {
  private heroDbKey: string = 'hero-db';
  public heroDb: HeroDb | null = null;

  private INITIAL_DATA: HeroDb = {
    11: { id: 11, name: 'Mr. Nice' },
    12: { id: 12, name: 'Batman' },
    13: { id: 13, name: 'Bombasto' },
    14: { id: 14, name: 'Celeritas' },
    15: { id: 15, name: 'Magneta' },
    16: { id: 16, name: 'RubberMan' },
    17: { id: 17, name: 'Dynama' },
    18: { id: 18, name: 'Dr IQ' },
    19: { id: 19, name: 'Magma' },
    20: { id: 20, name: 'Tornado' },
  };

  public loadDb(): HeroDb {
    let db: string | null = localStorage.getItem(this.heroDbKey);

    this.heroDb = db ? (JSON.parse(db) as HeroDb) : this.INITIAL_DATA;

    return this.heroDb;
  }

  public save(hero: Hero): void {
    // Ensuring database is loaded
    if (!this.heroDb) {
      this.loadDb();
    }

    // Error checks
    if (!hero || hero.id <= 0 || !this.heroDb) {
      return;
    }

    // Update existing hero
    this.heroDb[hero.id] = { ...hero };

    this.saveDb();
  }

  private saveDb(): void {
    localStorage.setItem(this.heroDbKey, JSON.stringify(this.heroDb));
  }

  public getHeroById(id: number): Hero | null {
    return !this.heroDb || id <= 0 ? null : this.heroDb[id];
  }
}
