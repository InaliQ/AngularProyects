import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reservations } from '../../interfaces/reservations.interface';

@Component({
  templateUrl: './confirm-dialog-request.component.html',
  styleUrls: ['./confirm-dialog-request.component.css']
})
export class ConfirmDialogRequestComponent {
  constructor(
    public dialogRef: MatDialogRef< ConfirmDialogRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reservations,
  ){}


  onNoClick():void{
    this.dialogRef.close(false);
  }

  onConfirm():void{
    this.dialogRef.close(true)
  }
}
