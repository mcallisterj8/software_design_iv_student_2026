import { Hero } from './hero';

export interface HeroDb {
  [key: number]: Hero;
}
