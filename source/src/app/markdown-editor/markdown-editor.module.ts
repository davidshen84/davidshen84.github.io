import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatGridListModule, MatInputModule} from '@angular/material';
import {MarkdownModule} from 'ngx-markdown';

import {MarkdownEditorRoutingModule} from './markdown-editor-routing.module';
import {MarkdownEditorComponent} from './markdown-editor.component';

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
