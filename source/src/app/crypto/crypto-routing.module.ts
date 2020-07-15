import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoRS256Component } from './crypto-rs256/crypto-rs256.component';

const routes: Routes = [{ path: '', component: CryptoRS256Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CryptoRoutingModule {}
