import { UpperCasePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../../models/hero';
import { HeroDbService } from '../../services/hero-db-service';

@Component({
  selector: 'app-hero-details',
  imports: [FormsModule, UpperCasePipe],
  templateUrl: './hero-details.html',
  styleUrl: './hero-details.css',
})
export class HeroDetails {
  private _heroDbService = inject(HeroDbService);
  @Input() hero: Hero | null = null;

  public save(): void {
    if (this.hero) {
      this._heroDbService.save(this.hero);
    }
  }
}
