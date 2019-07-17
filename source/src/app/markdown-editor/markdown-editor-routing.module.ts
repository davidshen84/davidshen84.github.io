import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownEditorComponent } from './markdown-editor.component';

const routes: Routes = [
  {path: '', component: MarkdownEditorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarkdownEditorRoutingModule {
}
