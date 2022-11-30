import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Semana } from '../models/semana-model';
import { StoresComponent } from '../stores/stores.component';

@Component({
  selector: 'app-ophours-dialog',
  templateUrl: './ophours-dialog.component.html',
  styleUrls: ['./ophours-dialog.component.css']
})
export class OphoursDialogComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: Semana  , private dialogRef: MatDialogRef<OphoursDialogComponent>) {
    dialogRef.disableClose = true;
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
