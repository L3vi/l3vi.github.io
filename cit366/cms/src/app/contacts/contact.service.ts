import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: Number): Contact {
    let contactFound: Contact = this.contacts.find((e) => e.id === id);
    if (contactFound === undefined) {
      return null
    } else return contactFound;
  }

  constructor() {
    this.contacts = MOCKCONTACTS;
  }
}
