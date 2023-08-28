


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Employees } from '../interfaces/employees.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class EmployeesService {
  private baseUrl: string = environments.baseUrl;


  constructor(private https: HttpClient) { }

  getEmployees(): Observable<Employees[]>{
    return this.https.get<Employees[]>(`${this.baseUrl}/employees`)
  }

  getEmployeesByID(id: string): Observable<Employees | undefined>{
    return this.https.get<Employees>(`${ this.baseUrl }/employees/${ id }`)
    .pipe(
      catchError( error => of( undefined ))
    );
  }

  updateEmployees( employees: Employees ):Observable<Employees>{
    if(!employees.id) throw Error('Customer ID is required');
    return this.https.patch<Employees>(`${ this.baseUrl }/employees/${ employees.id}`, employees)
  }
  saveEmployees( employees: Employees ):Observable<Employees>{
    return this.https.post<Employees>(`${this.baseUrl}/employees`, employees)

  }

  deleteEmployees(id: string): Observable<boolean>{

    return this.https.delete(`${ this.baseUrl }/employees/${ id }`)
    .pipe(
      map(resp => true),
      catchError( err => of(false)),
    );
  }
}
