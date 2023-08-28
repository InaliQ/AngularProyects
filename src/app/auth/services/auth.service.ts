
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../interfaces/auth.interfaces';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: Users;

  constructor( private http: HttpClient) { }


  get currentUser(): Users | undefined{
    if(!this.user) return undefined;

    return structuredClone( this.user)
  }

  login( user: string, password:string ): Observable<Users>{
    return this.http.get<Users>(`${ this.baseUrl }/user/1`)
    .pipe(
      tap( user => this.user = user),
      tap( user => localStorage.setItem('token','ahfihakfa.fajhfoa.fafafae'))
    );
  }


  checkAuthentication(): Observable<boolean>{

    if(!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<Users>(`${ this.baseUrl }/user/1`)
    .pipe(
      tap( user => this.user = user),
      map( user => !!user),
      catchError( err => of( false ))
    );


  }

logout(): void{

  this.user = undefined;
  localStorage.clear();
}

}
