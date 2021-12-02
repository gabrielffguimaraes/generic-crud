# GenericCrud

Slim code , agilização do processo de criação de Cruds angular e boas práticas , com esse foco que foi desenvolvida uma classe
que por meio de herança é consumida pelas classes principais , com as operações basicas já criadas , create , read , update e delete .

## Exemplo 

no exemplo abaixo temos uma classe consumindo o crudService.

class CursosService extends GenericCrudService<T> {\n
  constructor(private _http: HttpClient) {
    super();
    this.API = `${environment.baseUrl}/cursos`;
    this.http = _http;
  }
}

 
