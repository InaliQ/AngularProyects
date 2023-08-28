

import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Reservations } from '../interfaces/reservations.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class RequetsService {
private baseUrl: string = environments.baseUrl;

  constructor( private https: HttpClient) { }

  getRequets(): Observable<Reservations[]>{
    return this.https.get<Reservations[]>(`${this.baseUrl}/reservation`);
  }

  updateRequest( reservations: Reservations): Observable<Reservations>{
    if(!reservations.id)throw Error('Request ID is required');
    return this.https.patch<Reservations>(`${this.baseUrl}/reservation/${reservations.id}`,reservations)
  }
  deleteRequest(id : string):Observable<boolean>{

    return this.https.delete(`${ this.baseUrl}/reservation/${id}`)
    .pipe(
      map( resp => true),
      catchError( err => of(false)),
    )
  }







  saveReservation( reservations: Reservations): Observable<Reservations>{
    return this.https.post<Reservations>(`${this.baseUrl}/reservation`, reservations)
  }

}
