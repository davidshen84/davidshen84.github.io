import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCheckboxModule, MatSliderModule, MatCardModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCheckboxModule, MatSliderModule, MatListModule, MatCardModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
  exports: [MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCheckboxModule, MatSliderModule, MatListModule, MatCardModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSnackBarModule]
})
export class MaterialModules {}
