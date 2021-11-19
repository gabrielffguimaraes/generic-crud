import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenericCrudService<T> {
  protected API: string;
  protected http: HttpClient;
  constructor() {}
  save(registro: T): Observable<T> {
    return (registro && registro['id'] && registro['id'] !== '') ? this.update(registro) : this.create(registro);
  }
  create(registro: T): Observable<T>{
    return  this.http.post<T>(this.API, registro).pipe(tap(console.log), take(1));
  }
  update(registro: T): Observable<T>{
    return  this.http.put<T>(`${this.API}/${registro['id']}`, registro).pipe(tap(console.log), take(1));
  }
  delete(registro: T): Observable<T[]>{
    return  this.http.delete<any>(`${this.API}/${registro['id']}`).pipe(tap(console.log), take(1));
  }
  list(): Observable<T[]> {
    return this.http.get<T[]>(this.API);
  }
}
