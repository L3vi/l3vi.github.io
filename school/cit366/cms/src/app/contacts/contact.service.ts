import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  constructor(private http: HttpClient) {
    this.contacts = [];
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
    this.http.get('http://localhost:3000/contacts/').subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      this.maxContactId = this.getMaxId()
      this.contacts.sort((contactA, contactB) => {
        if (contactA.name < contactB.name) {
          return -1;
        } else if (contactA.name > contactB.name) {
          return 1;
        } else return 0;
      });
      this.contactListChangedEvent.next(this.contacts.slice());
    }, (error) => {
      console.error(error);
    })
    return this.contacts.slice();
  }

  getContact(id): Contact {
    // Again, why do I need to translate this id into a number?
    let contactFound: Contact = this.contacts.find((contact) => contact.id == id);
    if (contactFound === undefined) {
      return null
    } else return contactFound;
  }

  addContact(newContact: Contact) {
    if (newContact === null || newContact === undefined) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    newContact.id = null;
    const strContact = JSON.stringify(newContact);

    this.http.post('http://localhost:3000/contacts', strContact, { headers: headers })
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.contactListChangedEvent.next(this.contacts.slice());
      })
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
    this.storeContacts();
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
    this.storeContacts();
  }

  storeContacts() {
    this.http.put('https://cit366-46ac1.firebaseio.com/contacts.json',
      JSON.stringify(this.contacts),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).subscribe(() => {
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }
}
