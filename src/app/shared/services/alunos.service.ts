import { Injectable } from '@angular/core';
import {GenericCrudService} from './generic-crud.service';
import {Aluno} from '../models/aluno';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlunosService extends GenericCrudService<Aluno>{

  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) {
    super();
    this.API = `${environment.baseUrl}/alunos`;
    this.http = _http;
  }
}
