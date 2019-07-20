import { Injectable, EventEmitter } from '@angular/core';
import { Favorite } from './favorite.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favorites: Favorite[] = [];
  favoriteListChangedEvent = new EventEmitter<Favorite[]>();
  favoriteChangedEvent = new EventEmitter<Favorite>();
  editModeChanged = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
    this.favorites = [];
  }

  editFavorites(status: boolean) {
    this.editModeChanged.next(status);
  }

  createFavorite() {

  }

  getFavorites() {
    this.http.get('http://localhost:3000/favorites/').subscribe((favorites: Favorite[]) => {
      this.favorites = favorites;
      this.favoriteListChangedEvent.next(this.favorites.slice());
    }, error => {
      console.error(error);
    })

    return this.favorites.slice();
  }

  updateFavorite(originalFavorite: Favorite, newFavorite: Favorite) {
    if (!originalFavorite || !newFavorite) {
      return;
    }

    const pos = this.favorites.indexOf(originalFavorite);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    newFavorite.id = originalFavorite.id;
    const strFavorite = JSON.stringify(newFavorite);

    this.http.patch('http://localhost:3000/favorites/' + originalFavorite.id, strFavorite, { headers: headers })
      .subscribe((favorites: Favorite[]) => {
        this.favorites = favorites;
        this.favoriteListChangedEvent.next(this.favorites.slice());
        this.editModeChanged.next(false);
      })

  }

  deleteFavorite(favorite: Favorite) {
    if (!favorite) {
      return;
    }

    this.http.delete('http://localhost:3000/favorites/' + favorite.id)
      .subscribe((favorites: Favorite[]) => {
        this.favorites = favorites;
        this.favoriteListChangedEvent.next(this.favorites.slice());
        this.editModeChanged.next(false);
      })

  }
}
