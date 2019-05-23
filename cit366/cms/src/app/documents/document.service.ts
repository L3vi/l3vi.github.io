import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: Number): Document {
    let documentFound = this.documents.find(d => d.id === id)
    if (documentFound != undefined) {
      return documentFound;
    } else return null;
  }

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }
}
