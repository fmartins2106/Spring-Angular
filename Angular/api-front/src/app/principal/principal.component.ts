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

  // Variável para visibilidade da tabela
  tabela:boolean = true;

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

// Método para selecionar um cliente especifico.
selecionarCliente(posicao:number):void {

  // Selecionar cliente no vetor
  this.cliente = this.clientes[posicao];

  // Visibilidade dos botões.
  this.btnCadastro = false;

  // Visibilidade da tabela.
  this.tabela = false;
}

 // Método para editar clientes
  editar():void {
      this.servico.editar(this.cliente)
      .subscribe(retorno => {
          // Obter posição do vetor onde está o cliente
          let posicao = this.clientes.findIndex(obj => {
            return obj.codigo == retorno.codigo;
          });
          // Alterar os dados do cliente no vetor
          this.clientes[posicao] = retorno;

          // Limpar formulários
          this.cliente = new Cliente();

          // Visibilidade dos botões;
          this.btnCadastro = true;

          // Visibilidade da tabela
          this.tabela = true;

          // Mensagem
          alert("Cliente alterado com sucesso");
      });
  }


// Método para remover clientes
remover(): void {
 // assumimos que cliente foi selecionado (botão só aparece assim)
  const codigo = this.cliente.codigo!; // ! porque o botão garante que existe código

  this.servico.remover(codigo).subscribe({
    next: () => {
      // Obter posição do vetor onde está o cliente
      const posicao = this.clientes.findIndex(
        obj => obj.codigo === this.cliente.codigo
      );

      // Remover cliente do vetor, se encontrado
      if (posicao !== -1) {
        this.clientes.splice(posicao, 1);
        alert("Cliente removido com sucesso!");
      } else {
        alert("Cliente não encontrado na lista local.");
      }

      // Limpar formulário e restaurar estados da interface
      this.cliente = new Cliente();
      this.btnCadastro = true;
      this.tabela = true;
    },
    error: erro => {
      console.error("Erro ao remover cliente:", erro);
      alert("Ocorreu um erro ao tentar remover o cliente. Tente novamente.");
    }
  });
}

// Método para cancelar
cancelar(): void {
         // Limpar formulários
          this.cliente = new Cliente();

          // Visibilidade dos botões;
          this.btnCadastro = true;

          // Visibilidade da tabela
          this.tabela = true;
}



//Método de inicialização
ngOnInit(){
  this.selecionar();
}

}
