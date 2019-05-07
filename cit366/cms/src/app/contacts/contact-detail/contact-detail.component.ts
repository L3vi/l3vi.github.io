import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact = new Contact(1, 'Levi Stum', 'levistum@gmail.com', "435-851-1720", 'https://pbs.twimg.com/profile_images/930705267699978240/uQAeeF3__400x400.jpg', null);
  constructor() { }

  ngOnInit() {
  }

}
