import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: Number): Contact {
    // why do I need to cast id to a number? It's already being passed in as a number... weird.
    let contactFound: Contact = this.contacts.find((contact) => contact.id === Number(id));
    if (contactFound === undefined) {
      return null
    } else return contactFound;
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }

    const position = this.contacts.indexOf(contact);
    if (position < 0) {
      return;
    }

    this.contacts.splice(position, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }

  constructor() {
    this.contacts = MOCKCONTACTS;
  }
}
