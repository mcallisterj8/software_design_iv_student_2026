import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBar } from './components/search-bar/search-bar';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchBar],
  imports: [CommonModule, FormsModule],
  exports: [SearchBar],
})
export class TitleSearchBarModule {}
