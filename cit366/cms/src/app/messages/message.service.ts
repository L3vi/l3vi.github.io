import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageSelectedEvent = new EventEmitter<Message>();
  messageChangeEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.messages = this.getMessages();
    this.maxMessageId = this.getMaxId();
  }

  getMessages(): Message[] {
    this.http.get('https://cit366-46ac1.firebaseio.com/messages.json').subscribe((messages: Message[]) => {
      this.messages = messages
      this.maxMessageId = this.getMaxId()
      this.messageChangeEvent.emit(this.messages.slice());
    }, (error) => {
      console.error(error);
    })
    return this.messages.slice();
  }

  getMessage(id: number): Message {
    let messageFound = this.messages.find(message => message.id == id)
    if (messageFound != undefined) {
      return messageFound;
    } else return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId(): number {
    var maxId: number = 0;
    this.messages.forEach(contact => {
      if (contact.id > maxId) {
        maxId = contact.id;
      }
    });
    return maxId;
  }

  storeMessages() {
    this.http.put('https://cit366-46ac1.firebaseio.com/messages.json',
      JSON.stringify(this.messages),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).subscribe(() => {
      this.messageChangeEvent.emit(this.messages.slice());
    });
  }
}
