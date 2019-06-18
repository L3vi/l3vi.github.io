import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = null;
  contactGroup: Contact[] = [];
  editMode: Boolean = false;
  invalidGroupContact: Boolean = false;
  hasGroup: Boolean = false;

  onSubmit(form: NgForm) {
    let values = form.value;

    let newContact = new Contact(values.id, values.name, values.email, values.phone, values.imageUrl, values.group);

    if (this.editMode) {
      this.contactService.updateContact(this.contact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigateByUrl('/contacts');
  }

  onCancel() {
    this.router.navigateByUrl('/contacts');
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }

    if (newContact.id === this.contact.id) {
      return true;
    }

    if ((this.contactGroup.filter((contact: Contact) => newContact.id === contact.id)).length > 0) {
      return true;
    }

    return false;
  }

  addToGroup(event: any) {
    let selectedContact: Contact = event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.contactGroup.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx >= this.contactGroup.length) {
      return;
    }

    this.contactGroup.splice(idx, 1);
    this.invalidGroupContact = false;
  }

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let id = params.id;

      if (!id) {
        this.editMode = false;
        return;
      }

      let originalContact = this.contactService.getContact(id);
      if (!originalContact) {
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(originalContact));

      if (this.contact.group) {
        this.contactGroup = this.contact.group.slice();
      }
    })
  }

}
