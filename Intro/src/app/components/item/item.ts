import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item implements OnInit {
 
  private _route = inject(ActivatedRoute);

  public itemId: string | null = null;

   ngOnInit(): void {
    this.itemId = this._route.snapshot.paramMap.get('itemId');
  }

}
