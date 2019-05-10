import { Component, Input } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';
  @Input() selectedTab: String = "documents";

  switchView(selectedTab: String) {
    console.log(selectedTab);
    this.selectedTab = selectedTab;
  }
}
