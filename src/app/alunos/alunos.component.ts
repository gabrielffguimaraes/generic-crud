import { Component, OnInit } from '@angular/core';
import {Aluno} from '../shared/models/aluno';
import {AlunosService} from '../shared/services/alunos.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})

export class AlunosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'options'];
  dataSource: Aluno [];
  formulario: FormGroup;
  constructor(private alunosService: AlunosService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]]
    });
    this.refresh();
  }
  onSubmit(): void {
    if (this.formulario.valid) {
      this.alunosService
        .create(this.formulario.value as Aluno)
        .subscribe(
          success => {
            this.refresh();
          },
          error => {
            alert('Error');
          }, () => {
          }
        );
    }
  }
  refresh(): void {
    this.alunosService
      .list()
      .subscribe( data => this.dataSource = data);
  }
}
