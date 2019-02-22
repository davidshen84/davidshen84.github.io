import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material';
import {MarkdownModule} from 'ngx-markdown';

import {MarkdownEditorComponent} from './markdown-editor.component';

describe('MarkdownEditorComponent', () => {
  let component: MarkdownEditorComponent;
  let fixture: ComponentFixture<MarkdownEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatGridListModule,
        MarkdownModule.forRoot()
      ],
      declarations: [MarkdownEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
