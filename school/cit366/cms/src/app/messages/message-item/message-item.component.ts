import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  messageSender: string = "";
  @Input() message: Message

  constructor(private contactService: ContactService) {
    this.contactService.getContacts();
  }

  ngOnInit() {
    this.messageSender = this.contactService.getContact(this.message.sender).name;
  }

}
