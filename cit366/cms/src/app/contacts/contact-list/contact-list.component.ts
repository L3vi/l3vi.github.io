import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() contactItemSelected = new EventEmitter<Contact>();
  contacts: Contact[] = [
    new Contact(1, 'Levi Stum', 'levistum@gmail.com', "435-851-1720", 'https://avatars0.githubusercontent.com/u/15318252?s=460&v=4', null),
    new Contact(2, 'Bro. Barzee', 'barzeer@byui.edu', "208-496-3768", 'https://web.byui.edu/Directory/Employee/barzeer.jpg', null)
  ];

  onContactSelected(contact: Contact) {
    this.contactItemSelected.emit(contact);
  }

  constructor() { }

  ngOnInit() {
  }

}
