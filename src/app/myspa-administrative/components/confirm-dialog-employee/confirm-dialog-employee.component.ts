
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef} from '@angular/material/dialog';
import { Employees } from '../../interfaces/employees.interface';

@Component({
  templateUrl: './confirm-dialog-employee.component.html',
  styleUrls: ['./confirm-dialog-employee.component.css']
})
export class ConfirmEmployeeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef< ConfirmEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employees,
  ){}


  onNoClick():void{
    this.dialogRef.close(false);
  }

  onConfirm():void{
    this.dialogRef.close(true)
  }
}
