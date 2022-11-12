import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CryptoRoutingModule } from './crypto-routing.module';
import { CryptoRS256Component } from './crypto-rs256/crypto-rs256.component';
import { RS256CryptoService } from './rs256-crypto.service';
import { RemarkableModule } from '../remarkable/remarkable.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [CryptoRS256Component],
  imports: [
    CommonModule,
    CryptoRoutingModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RemarkableModule,
  ],
  providers: [RS256CryptoService],
})
export class CryptoModule {}
