import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>()
  documents: Document[] = [
    new Document(1, "Resume", "List of skills n' stuff", "https://l3vi.github.io/ePortfolio/", []),
    new Document(2, "CIT 230", "CIT 230 projects", "https://l3vi.github.io/cit230/index.html", []),
    new Document(3, "CIT 261", "CIT 261 stuff", "https://l3vi.github.io/cit261/index.html", []),
    new Document(4, "CIT 366", "Nothing for now", "https://l3vi.github.io/cit366/index.html", [])
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  };

  constructor() { }

  ngOnInit() {
  }

}
