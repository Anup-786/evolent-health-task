import { NgModule } from '@angular/core';
import {
  MatDialogModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSlideToggleModule,
  MatSnackBarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ]
})
export class MaterialConfigModule {}
