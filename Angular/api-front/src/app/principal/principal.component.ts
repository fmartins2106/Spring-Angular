import { Component } from '@angular/core';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';
import { ClienteService } from '../servico/cliente.service';
import { Cliente } from '../modelo/Cliente';

@Component({
  selector: 'app-principal',
  imports: [NgIf, NgForOf, JsonPipe],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  //Objeto do tipo Cliente
  cliente = new Cliente();

  // Variável para visibilidade dos botões
  btnCadastro:boolean = true;

  //Json de clientes
  clientes:Cliente[] = [];

  //Construtor
  constructor(private servico:ClienteService){}

  //Método de selação
selecionar(): void {
  this.servico.selecionar().subscribe({
    next: retorno => this.clientes = retorno,
    error: erro => console.error('Erro ao buscar clientes:', erro)
  });
}

//Método de inicialização
ngOnInit(){
  this.selecionar();
}

}
