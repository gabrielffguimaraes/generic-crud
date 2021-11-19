import { Injectable } from '@angular/core';
import {GenericCrudService} from './generic-crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Curso} from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService extends GenericCrudService<Curso> {

  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) {
    super();
    this.API = `${environment.baseUrl}/cursos`;
    this.http = _http;
  }
}
