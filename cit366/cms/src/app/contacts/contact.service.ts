import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getMaxId(): number {
    var maxId: number = 0;
    this.contacts.forEach(contact => {
      if (contact.id > maxId) {
        maxId = contact.id;
      }
    });
    return maxId;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: number): Contact {
    let contactFound: Contact = this.contacts.find((contact) => contact.id === id);
    if (contactFound === undefined) {
      return null
    } else return contactFound;
  }

  addcontact(newcontact: Contact) {
    if (newcontact === null || newcontact === undefined) {
      return;
    }

    this.maxContactId++;
    newcontact.id = this.maxContactId;
    this.contacts.push(newcontact);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    var position = this.contacts.indexOf(originalContact);
    if (position < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[position] = newContact;
    this.contactListChangedEvent.next(this.contacts.slice());
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
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}
