import { Component, OnInit } from '@angular/core';
import { Favorite } from '../favorite.model';
import { FavoritesService } from '../favorites.service';


@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit {

  constructor(private fService: FavoritesService) {
    this.favorites = this.fService.getFavorites();
    this.fService.favoriteListChangedEvent.subscribe((favorites: Favorite[]) => {
      this.favorites = favorites;
    })
    this.fService.editModeChanged.subscribe((editMode: boolean) => {
      this.editMode = editMode
    });
  }

  favorites: Favorite[] = [];
  editMode: boolean = false;

  ngOnInit() {
  }

}
