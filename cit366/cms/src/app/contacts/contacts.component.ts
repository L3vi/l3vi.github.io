import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contactName = "Levi Stum";

  updateContactName(event: Event) {
    this.contactName = (<HTMLInputElement>event.target).value;
  }

  constructor() { }

  ngOnInit() {
  }

}
