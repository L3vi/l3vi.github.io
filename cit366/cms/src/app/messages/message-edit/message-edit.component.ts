import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: String = "19";
  @Output() sendMessageEvent = new EventEmitter<Message>();
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('message') messageText: ElementRef;

  onSendMessage() {
    let message = new Message(123, this.subject.nativeElement.value, this.messageText.nativeElement.value, this.currentSender);
    this.messageService.addMessage(message);
    // this.sendMessageEvent.emit(message);
    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = "";
    this.messageText.nativeElement.value = "";
  }

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

}
