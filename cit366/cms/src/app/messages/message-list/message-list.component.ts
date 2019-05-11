import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(4358511720, "Testing", "Hello World", "Levi Stum"),
    new Message(4358511720, "Hey", "Cutie", "Levi Stum")
  ]

  onSendMessage(message: Message) {
    this.messages.push(message);
  }

  constructor() { }

  ngOnInit() {
  }

}
