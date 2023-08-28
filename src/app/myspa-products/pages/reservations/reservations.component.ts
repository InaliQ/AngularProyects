import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Reservations } from 'src/app/myspa-administrative/interfaces/reservations.interface';
import { AdministrativeModule } from '../../../myspa-administrative/administrative.module';
import { AdministrativeEmployeesComponent } from '../../../myspa-administrative/pages/employees/employess.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequetsService } from 'src/app/myspa-administrative/services/request.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogRequestComponent } from 'src/app/myspa-administrative/components/confirm-dialog-request/confirm-dialog-request.component';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'products-reservation',
  templateUrl: './reservations.component.html',
  styles: [
  ]
})
export class ServiceReservationsComponent implements OnInit {

  public reservation: Reservations[] = [];
  public idReservation?: Reservations;

  ngOnInit(): void {
      this.reservationService.getRequets()
      .subscribe( reservation => this.reservation = reservation);
  }
constructor(
  private reservationService: RequetsService,
  private snackbar: MatSnackBar,
  private dialog: MatDialog
){}

  public reservationsForms = new FormGroup({
    id:        new FormControl(),
    date:      new FormControl(""),
    cost:      new FormControl(0),

    idU:       new FormControl(),
    nameU:     new FormControl(""),
    emailU:    new FormControl(""),

    idP:       new FormControl(),
    nameP:     new FormControl(""),
    priceP:    new FormControl(""),

    idE:       new FormControl(),
    nameE:     new FormControl("")
  });

  get currentReservation(): Reservations {
    const reservation = this.reservationsForms.value as Reservations;
    return reservation
  }

  reloadTable():void{
    this.reservationService.getRequets()
    .subscribe(reservations => {
      this.reservation = reservations;
    })
  }


  selectRequest(request: Reservations): void {
    this.reservationsForms.setValue({
      id: request.id,
      date: request.date,
      cost: request.cost,
      idU: request.idU,
      nameU: request.nameU,
      emailU: request.emailU,
      idP: request.idP,
      nameP: request.nameP,
      priceP: request.priceP,
      idE: request.idE,
      nameE: request.nameE
    });
    this.showSnackbar(`${request.nameU} select!! whith id: ${request.id}`)
  }

  onDeleteRequest(){
    if(!this.currentReservation.id)throw Error('Request id is required')
   const dialogRef = this.dialog.open(ConfirmDialogRequestComponent,{
      data: this.reservationsForms.value
  });

  dialogRef.afterClosed()
  .pipe(
    filter((result: boolean) => result),
    switchMap( () => this.reservationService.deleteRequest(this.currentReservation.id.toString())),
    filter( ( wasDeleter: boolean) => wasDeleter),
  )
  .subscribe( () => {
    this.reloadTable();
  })
  }

  onSubmit(): void {
    if (this.reservationsForms.invalid) return;

    const currentRequest = this.currentReservation;

    if (currentRequest.id) {
      this.reservationService.updateRequest(currentRequest)
        .subscribe(request => {
          this.showSnackbar(`${request.id} updated!!`);
          this.resetForm();
          this.reloadTable();
        });
    } else {
      this.reservationService.saveReservation(currentRequest)
        .subscribe(request => {
          this.showSnackbar(`${request.id} created!!`);
          this.resetForm();
          this.reloadTable();
        });
    }
  }

  showSnackbar(message: string): void{
    this.snackbar.open( message, 'done',{
      duration: 2500,
    });
  }

  resetForm(): void {
    this.reservationsForms.reset();
  }



}
