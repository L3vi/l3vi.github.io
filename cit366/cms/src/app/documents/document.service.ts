import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: Number): Document {
    let documentFound = this.documents.find(document => document.id === id)
    if (documentFound != undefined) {
      return documentFound;
    } else return null;
  }

  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }

    const position = this.documents.indexOf(document);
    if (position < 0) {
      return;
    }

    this.documents.splice(position, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }
}
