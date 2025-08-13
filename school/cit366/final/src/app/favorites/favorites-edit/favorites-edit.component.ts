import { Component, OnInit, Input } from '@angular/core';
import { Favorite } from '../favorite.model';
import { NgForm } from '@angular/forms';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-favorites-edit',
  templateUrl: './favorites-edit.component.html',
  styleUrls: ['./favorites-edit.component.css']
})
export class FavoritesEditComponent implements OnInit {

  constructor(private fService: FavoritesService) { }

  @Input() favorite: Favorite;

  onSubmit(form: NgForm) {
    var values = form.value;
    var newFavorite = new Favorite(null, values.color, values.word);

    this.fService.updateFavorite(this.favorite, newFavorite);
  }

  delete() {
    this.fService.deleteFavorite(this.favorite);
  }

  ngOnInit() {
  }

}
