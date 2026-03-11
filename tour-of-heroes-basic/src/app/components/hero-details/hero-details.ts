import { Component, Input } from '@angular/core';
import { Hero } from '../../models/hero';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-details',
  imports: [FormsModule],
  templateUrl: './hero-details.html',
  styleUrl: './hero-details.css',
})
export class HeroDetails {
  @Input() hero: Hero | null = null;

}
