import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Customers } from 'src/app/myspa-administrative/interfaces/custumers.interface';

@Component({
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['confirm-dialog-component.css']
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef< ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customers,
  ){}


  onNoClick():void{
    this.dialogRef.close(false);
  }

  onConfirm():void{
    this.dialogRef.close(true)
  }
}
