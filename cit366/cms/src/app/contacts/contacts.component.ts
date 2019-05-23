import { Component, OnInit, Input } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @Input() selectedContact: Contact;

  setContact(contact: Contact) {
    this.selectedContact = contact;
  }

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    // this.contactService.contactSelectedEvent
    this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.selectedContact = contact;
    })
  }

}
