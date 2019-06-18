import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  maxDocumentId: number;
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: number): Document {
    // WHY DO I NEED TO PARSE THIS TO A NUMBER
    let documentFound = this.documents.find(document => document.id === Number(id));
    if (documentFound != undefined) {
      return documentFound;
    } else return null;
  }

  getMaxId(): number {
    var maxId: number = 0;
    this.documents.forEach(document => {
      if (document.id > maxId) {
        maxId = document.id;
      }
    });
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument === null || newDocument === undefined) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId;
    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    var position = this.documents.indexOf(originalDocument);
    if (position < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[position] = newDocument;
    this.documentListChangedEvent.next(this.documents.slice());
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const position = this.documents.indexOf(document);
    if (position < 0) {
      return;
    }

    this.documents.splice(position, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }

}
