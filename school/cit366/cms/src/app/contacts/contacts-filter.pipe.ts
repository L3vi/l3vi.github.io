import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: any, term: any): any {
    let filteredList = contacts.filter((contact: Contact) => {
      if (term === undefined) {
        return contact;
      } else if (contact.name.toLowerCase().includes(term.toLowerCase())) {
        return contact;
      }
    });

    if (filteredList.length < 1) {
      return contacts;
    }

    return filteredList
  }

}
