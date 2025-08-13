import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: string = "1";
  @Output() sendMessageEvent = new EventEmitter<Message>();
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('message') msgText: ElementRef;

  onSendMessage() {
    let message = new Message(this.messageService.getMaxId() + 1, this.subject.nativeElement.value, this.msgText.nativeElement.value, this.currentSender);
    this.messageService.addMessage(message);
    // this.sendMessageEvent.emit(message);
    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

}
