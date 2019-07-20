import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FavoritesListComponent } from './favorites/favorites-list/favorites-list.component';
import { FavoritesItemComponent } from './favorites/favorites-item/favorites-item.component';
import { FavoritesEditComponent } from './favorites/favorites-edit/favorites-edit.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesControlsComponent } from './favorites/favorites-controls/favorites-controls.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FavoritesListComponent,
    FavoritesItemComponent,
    FavoritesEditComponent,
    FavoritesComponent,
    FavoritesControlsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
