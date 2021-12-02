# GenericCrud

Slim code , agilização do processo de criação de Cruds angular e boas práticas , com esse foco que foi desenvolvida uma classe
que por meio de herança é consumida pelas classes principais , com as operações basicas já criadas , create , read , update e delete .

## Exemplo 

no exemplo abaixo temos uma classe consumindo o crudService.

````typescript
class CursosService extends GenericCrudService<T> {
  constructor(private _http: HttpClient) {
    super();
    this.API = `${environment.baseUrl}/cursos`;
    this.http = _http;
  }
}
````

## Classe genérica

````typescript
class GenericCrudService<T> {
  protected API: string;
  protected http: HttpClient;
  constructor() {}
  save(registro: T): Observable<T> {
    console.log(registro);
    return (registro && registro['id'] && registro['id'] !== '') ? this.update(registro) : this.create(registro);
  }
  delete(id: number): Observable<T[]>{
    return  this.http.delete<any>(`${this.API}/${id}`).pipe(take(1));
  }
  list(): Observable<T[]> {
    return this.http.get<T[]>(this.API);
  }
  private create(registro: T): Observable<T>{
    return  this.http.post<T>(this.API, registro).pipe(take(1));
  }
  private update(registro: T): Observable<T>{
    return  this.http.put<T>(`${this.API}/${registro['id']}`, registro).pipe(take(1));
  }
}
````
