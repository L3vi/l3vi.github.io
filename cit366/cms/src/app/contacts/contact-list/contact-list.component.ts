import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [
    new Contact(1, 'Levi Stum', 'levistum@gmail.com', "435-851-1720", 'https://pbs.twimg.com/profile_images/930705267699978240/uQAeeF3__400x400.jpg', null),
    new Contact(2, 'Bro. Barzee', 'barzeer@byui.edu', "208-496-3768", 'https://web.byui.edu/Directory/Employee/barzeer.jpg', null)
  ];

  constructor() { }

  ngOnInit() {
  }

}
