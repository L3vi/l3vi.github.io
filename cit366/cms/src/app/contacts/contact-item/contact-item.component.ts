import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Output() contactSelected = new EventEmitter<Contact>();
  @Input() contact: Contact

  getDetails() {
    this.contactSelected.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
