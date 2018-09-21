import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCheckboxModule, MatSliderModule, MatCardModule, MatDividerModule } from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCheckboxModule, MatSliderModule, MatListModule, MatCardModule, MatDividerModule],
  exports: [MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCheckboxModule, MatSliderModule, MatListModule, MatCardModule, MatDividerModule]
})
export class MaterialModules {}
