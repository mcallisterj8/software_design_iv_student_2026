import { Component, inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-snack-bar',
  imports: [],
  templateUrl: './success-snack-bar.html',
  styleUrl: './success-snack-bar.css',
})
export class SuccessSnackBar {
  public snackBarRef = inject(MatSnackBarRef);
  public message: string = inject(MAT_SNACK_BAR_DATA)?.message ?? 'Success';
}
