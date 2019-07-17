import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { MaterialModules } from '../material.modules';

import { CryptoRoutingModule } from './crypto-routing.module';
import { CryptoRS256Component } from './crypto-rs256/crypto-rs256.component';
import { RS256CryptoService } from './rs256-crypto.service';

@NgModule({
  declarations: [CryptoRS256Component],
  imports: [
    CommonModule,
    CryptoRoutingModule,
    MarkdownModule.forRoot(),
    FormsModule,
    MaterialModules
  ],
  providers: [
    RS256CryptoService
  ]
})
export class CryptoModule {
}
