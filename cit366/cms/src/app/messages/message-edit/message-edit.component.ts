import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: String = "Levi";
  @Output() sendMessageEvent = new EventEmitter<Message>();
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('message') messageText: ElementRef;

  onSendMessage() {
    let message = new Message(123, this.subject.nativeElement.value, this.messageText.nativeElement.value, this.currentSender);
    this.sendMessageEvent.emit(message);
    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = "";
    this.messageText.nativeElement.value = "";
  }

  constructor() { }

  ngOnInit() {
  }

}
