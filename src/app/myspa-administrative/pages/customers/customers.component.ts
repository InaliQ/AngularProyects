import { Component, OnInit } from '@angular/core';
import { Customers } from '../../interfaces/custumers.interface';
import { CustomersService } from '../../services/customers.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { filter, pipe, switchMap, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog-customer/confirm-dialog.component';

@Component({
  selector: 'administrative-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['customers.component.css']
})
export class AdministrativeCustomersComponent implements OnInit{



  //formulario reactivo
  public customerForms = new FormGroup({
    id:      new FormControl(),
    name:    new FormControl(""),
    address: new FormControl(""),
    user:    new FormControl(""),
    password:new FormControl(""),
    email:   new FormControl(""),
  })

get currentCustomer(): Customers{
  const customer = this.customerForms.value as Customers;
  return customer
}

reloadTable(): void {
  this.customersService.getCustomers()
    .subscribe(customers => {
      this.customers = customers;
    });
}


selectCustomer(customer: Customers): void {
  this.customerForms.setValue({
    id: customer.id,
    name: customer.name,
    address: customer.address,
    user: customer.user,
    password: customer.password,
    email: customer.email,

  });
}

onDeleteCustomer(){
  if(!this.currentCustomer.id)throw Error('Customer id is required')
 const dialogRef = this.dialog.open(ConfirmDialogComponent,{
    data: this.customerForms.value
});
dialogRef.afterClosed()
.pipe(
  filter((result: boolean) => result),
  switchMap( () => this.customersService.deleteCustomers(this.currentCustomer.id.toString())),
  filter( ( wasDeleter: boolean) => wasDeleter),
)
.subscribe( () => {
  this.resetForm();
  this.reloadTable();
})
}


onSubmit(): void {
  if (this.customerForms.invalid) return;

  const currentCustomer = this.currentCustomer;

  if (currentCustomer.id) {
    this.customersService.updateCustomer(currentCustomer)
      .subscribe(customer => {
        this.showSnackbar(`${customer.name} updated!!`);
        this.resetForm();
        this.reloadTable();
      });
  } else {
    this.customersService.saveCustomer(currentCustomer)
      .subscribe(customer => {
        this.showSnackbar(`${customer.name} created!!`);
        this.resetForm();
        this.reloadTable();
      });
  }
}

resetForm(): void {
  this.customerForms.reset();
}


  showSnackbar(message: string): void{
    this.snackbar.open( message, 'done',{
      duration: 2500,
    });
  }

  public customers: Customers[] = [];
  public idCustomer?: Customers;
  constructor(
    private customersService: CustomersService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    ){}

  ngOnInit(): void {

      this.customersService.getCustomers()
      .subscribe( customers => this.customers = customers);
    }
}
