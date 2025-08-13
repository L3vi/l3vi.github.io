import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-favorites-controls',
  templateUrl: './favorites-controls.component.html',
  styleUrls: ['./favorites-controls.component.css']
})
export class FavoritesControlsComponent implements OnInit {

  constructor(private fService: FavoritesService) {
    this.fService.editModeChanged.subscribe((editMode: boolean) => {
      this.editMode = editMode;
    })
  }

  editMode: boolean = false;

  createFavorite() {

  }

  editFavorites() {
    this.fService.editFavorites(true);
  }

  saveFavorites() {
    this.fService.editFavorites(false);
  }


  ngOnInit() {
  }

}
