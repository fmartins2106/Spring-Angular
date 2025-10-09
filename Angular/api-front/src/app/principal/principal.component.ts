import { Component } from '@angular/core';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';
import { ClienteService } from '../servico/cliente.service';
import { Cliente } from '../modelo/Cliente';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  imports: [NgIf, NgForOf, JsonPipe, FormsModule],
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

// Método cadastrar
cadastrar(): void {
  this.servico.cadastrar(this.cliente).subscribe({
    next: retorno => {
      console.log('Cliente cadastrado com sucesso:', retorno);
      this.clientes.push(retorno); // adiciona o cliente na lista
      this.cliente = new Cliente(); // limpa o formulário
      alert("Cliente cadastrado com sucesso.");
    },
    error: erro => console.error('Erro ao cadastrar cliente:', erro)
  });
}



//Método de inicialização
ngOnInit(){
  this.selecionar();
}

}
