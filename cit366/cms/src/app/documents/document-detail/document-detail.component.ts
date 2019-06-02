import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WindowRefService } from 'src/app/window-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document
  nativeWindow: any

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigateByUrl('/documents');
  }

  constructor(private documentService: DocumentService,
    private windowRefService: WindowRefService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((document: Document) => this.document = this.documentService.getDocument(document.id));
  }

}
