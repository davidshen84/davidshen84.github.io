import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MarkdownModule } from 'ngx-markdown';

import { MarkdownEditorRoutingModule } from './markdown-editor-routing.module';
import { MarkdownEditorComponent } from './markdown-editor.component';
import { MathJaxModule } from 'ngx-mathjax';

@NgModule({
  declarations: [MarkdownEditorComponent],
  imports: [
    CommonModule,
    MarkdownEditorRoutingModule,
    MarkdownModule.forChild(),
    MatGridListModule,
    MatInputModule,
    ReactiveFormsModule,
    MathJaxModule.forChild(),
  ],
})
export class MarkdownEditorModule {}
