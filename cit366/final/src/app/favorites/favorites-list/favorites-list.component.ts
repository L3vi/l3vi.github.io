import { Component, OnInit } from '@angular/core';
import { Favorite } from '../favorite.model';


@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit {

  constructor() { }

  favorites: Favorite[] = [
    {
      id: 1,
      color: "red",
      word: "Levi"
    },
    {
      id: 2,
      color: "blue",
      word: "Cool"
    },
    {
      id: 3,
      color: "green",
      word: "Live"
    }
  ];

  ngOnInit() {
  }

}
