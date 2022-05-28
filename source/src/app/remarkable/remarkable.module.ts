import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RemarkableComponent } from './remarkable.component';

@NgModule({
  declarations: [RemarkableComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [RemarkableComponent],
})
export class RemarkableModule {}
