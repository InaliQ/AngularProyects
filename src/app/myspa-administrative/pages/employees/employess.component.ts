import { Component, OnInit } from '@angular/core';
import { Employees } from '../../interfaces/employees.interface';
import { EmployeesService } from '../../services/employees.service';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmEmployeeDialogComponent } from '../../components/confirm-dialog-employee/confirm-dialog-employee.component';

@Component({
  selector: 'administrative-employees',
  templateUrl: './employees.component.html',
  styleUrls: [ 'employees.component.css']
})
export class AdministrativeEmployeesComponent implements OnInit{


  public employeesForms = new FormGroup({
    id:      new FormControl(),
    name:    new FormControl(""),
    address: new FormControl(""),
    user:    new FormControl(""),
    password:new FormControl(""),
    email:   new FormControl(""),
  })

  get currentEmployee():Employees{
    const employee = this.employeesForms.value as Employees;
    return employee
  }

  reloadTable():void{
    this.employeesService.getEmployees()
    .subscribe(employees => {
      this.employees = employees;
    })
  }

  selectEmployee(employee: Employees): void{
this.employeesForms.setValue({
    id: employee.id,
    name: employee.name,
    address: employee.address,
    user: employee.user,
    password: employee.password,
    email: employee.email,
    });
  }

  onDeleteEmployee(){
    if(!this.currentEmployee.id)throw Error('Employee id is required')
   const dialogRef = this.dialog.open(ConfirmEmployeeDialogComponent,{
      data: this.employeesForms.value
  });

  dialogRef.afterClosed()
  .pipe(
    filter((result: boolean) => result),
    switchMap( () => this.employeesService.deleteEmployees(this.currentEmployee.id.toString())),
    filter( ( wasDeleter: boolean) => wasDeleter),
  )
  .subscribe( () => {
    this.resetForm();
    this.reloadTable();
  })
  }

  onSubmit(): void {
    if (this.employeesForms.invalid) return;

    const currentEmployee = this.currentEmployee;

    if (currentEmployee.id) {
      this.employeesService.updateEmployees(currentEmployee)
        .subscribe(employee => {
          this.showSnackbar(`${employee.name} updated!!`);
          this.resetForm();
          this.reloadTable();
        });
    } else {
      this.employeesService.saveEmployees(currentEmployee)
        .subscribe( employee => {
          this.showSnackbar(`${employee.name} created!!`);
          this.resetForm();
          this.reloadTable();
        });
    }
  }

  resetForm(): void {
    this.employeesForms.reset();
  }


    showSnackbar(message: string): void{
      this.snackbar.open( message, 'done',{
        duration: 2500,
      });
    }


  public employees: Employees[] = [];
  public idEmployee?: Employees;

  constructor(
    private employeesService: EmployeesService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    ){}

  ngOnInit(): void {
      this.employeesService.getEmployees()
      .subscribe( employees => this.employees = employees);  }
}

