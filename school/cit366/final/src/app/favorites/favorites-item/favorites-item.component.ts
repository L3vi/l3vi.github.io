import { Component, OnInit, Input } from '@angular/core';
import { Favorite } from '../favorite.model';

@Component({
  selector: 'app-favorites-item',
  templateUrl: './favorites-item.component.html',
  styleUrls: ['./favorites-item.component.css']
})
export class FavoritesItemComponent implements OnInit {

  constructor() { }

  @Input() favorite: Favorite;

  ngOnInit() {
  }

}
