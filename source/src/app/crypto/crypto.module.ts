import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModules } from '../material.modules';

import { CryptoRoutingModule } from './crypto-routing.module';
import { CryptoRS256Component } from './crypto-rs256/crypto-rs256.component';
import { RS256CryptoService } from './rs256-crypto.service';
import { RemarkableModule } from '../remarkable/remarkable.module';

@NgModule({
  declarations: [CryptoRS256Component],
  imports: [
    CommonModule,
    CryptoRoutingModule,
    FormsModule,
    MaterialModules,
    RemarkableModule,
  ],
  providers: [RS256CryptoService],
})
export class CryptoModule {}
