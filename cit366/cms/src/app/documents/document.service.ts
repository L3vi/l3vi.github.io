import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  maxDocumentId: number;
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor(private http: HttpClient) {
    this.documents = [];
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    this.http.get('https://cit366-46ac1.firebaseio.com/documents.json').subscribe((documents: Document[]) => {
      this.documents = documents
      this.maxDocumentId = this.getMaxId()
      this.documents.sort((documentA, documentB) => {
        if (documentA.name < documentB.name) {
          return -1;
        } else if (documentA.name > documentB.name) {
          return 1;
        } else return 0;
      });
      this.documentListChangedEvent.next(this.documents.slice());
    }, (error) => {
      console.error(error);
    })
    return this.documents.slice();
  }

  getDocument(id: number): Document {
    // WHY DOES ID COME IN AS A STRING?
    let documentFound = this.documents.find(document => document.id === id);

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
    this.storeDocuments();
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
    this.storeDocuments();
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
    this.storeDocuments();
  }

  storeDocuments() {
    this.http.put('https://cit366-46ac1.firebaseio.com/documents.json',
      JSON.stringify(this.documents),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).subscribe(() => {
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }

}
