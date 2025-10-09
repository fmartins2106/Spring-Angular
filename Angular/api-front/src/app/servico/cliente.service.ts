import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // URL da API

  private url:string = 'http://localhost:8080/clientes';

  constructor(private http:HttpClient) { }


  //metodo para selecionar todos os clientes;
  selecionar():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }

  // Método Cadastrar Cliente;
  cadastrar(obj:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url, obj);
  }
}
