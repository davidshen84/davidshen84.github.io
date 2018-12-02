import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PasswordGeneratorComponent} from './password-generator.component';

const routes: Routes = [
  {path: '', component: PasswordGeneratorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordGeneratorRoutingModule { }
