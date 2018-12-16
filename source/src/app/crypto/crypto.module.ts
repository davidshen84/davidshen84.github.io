import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CryptoRoutingModule} from './crypto-routing.module';
import {CryptoRS256Component} from './crypto-rs256/crypto-rs256.component';
import {MarkdownModule} from 'ngx-markdown';
import {FormsModule} from '@angular/forms';
import {MaterialModules} from '../material.modules';

@NgModule({
  declarations: [CryptoRS256Component],
  imports: [
    CommonModule,
    CryptoRoutingModule,
    MarkdownModule.forRoot(),
    FormsModule,
    MaterialModules
  ]
})
export class CryptoModule {
}
