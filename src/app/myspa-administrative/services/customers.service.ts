import { Customers } from './../interfaces/custumers.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class CustomersService {

private baseUrl: string = environments.baseUrl;

  constructor(private https: HttpClient) { }


getCustomers():Observable<Customers[]>{
  return this.https.get<Customers[]>(`${this.baseUrl}/customers`);
}

getCustomerByID(id: string): Observable<Customers | undefined>{
  return this.https.get<Customers>(`${ this.baseUrl }/customers/${ id }`)
  .pipe(
    catchError( error => of( undefined ))
  );
}

updateCustomer( customers: Customers ):Observable<Customers>{
  if(!customers.id) throw Error('Customer ID is required');
  return this.https.patch<Customers>(`${ this.baseUrl }/customers/${ customers.id}`, customers)
}
saveCustomer( customers: Customers ):Observable<Customers>{
  return this.https.post<Customers>(`${this.baseUrl}/customers`, customers)

}

deleteCustomers(id: string): Observable<boolean>{

  return this.https.delete(`${ this.baseUrl }/customers/${ id }`)
  .pipe(
    map(resp => true),
    catchError( err => of(false)),
  );
}

}
