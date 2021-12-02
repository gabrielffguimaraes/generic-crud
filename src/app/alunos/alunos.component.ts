import {Component, OnDestroy, OnInit} from '@angular/core';
import {Aluno} from '../shared/models/aluno';
import {AlunosService} from '../shared/services/alunos.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ToastService} from '../shared/services/toast.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})

export class AlunosComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'nome', 'options'];
  dataSource: Aluno [];
  formulario: FormGroup;
  editarFlag = false;
  $unsubscribeForm: Subscription;
  constructor(private alunosService: AlunosService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]]
    });
    this.refresh();
    this.$unsubscribeForm = this.formulario.valueChanges
      .subscribe( f => {
        this.editarFlag = this.formulario.get('id') && this.formulario.get('id').value && this.formulario.get('id').value;
      });
  }
  ngOnDestroy(): void {
    this.$unsubscribeForm.unsubscribe();
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      this.alunosService
        .save(this.formulario.value as Aluno)
        .subscribe(success => {
            this.refresh();  this.formulario.reset();
            const message = (this.editarFlag) ? 'Editado com Sucesso' : 'Adicionado com Sucesso';
            ToastService.showToast(message , 'Sucesso');
          } , error => {
            alert('Error');
          } , () => {});
    }
  }
  onEdit(registro: Aluno): void {
    this.formulario.get('id').setValue(registro.id);
    this.formulario.get('nome').setValue(registro.nome);
  }
  onDelete(id: number): void {
    this.alunosService
      .delete(id)
      .subscribe( success => {
        this.refresh();
      });
  }
  refresh(): void {
    this.alunosService
      .list()
      .subscribe( data => this.dataSource = data);
  }
}
