import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MarkdownModule } from 'ngx-markdown';

import { MarkdownEditorRoutingModule } from './markdown-editor-routing.module';
import { MarkdownEditorComponent } from './markdown-editor.component';

@NgModule({
  declarations: [MarkdownEditorComponent],
  imports: [
    CommonModule,
    MarkdownEditorRoutingModule,
    MarkdownModule.forChild(),
    MatGridListModule,
    MatInputModule,
    FormsModule
  ]
})
export class MarkdownEditorModule {
}
