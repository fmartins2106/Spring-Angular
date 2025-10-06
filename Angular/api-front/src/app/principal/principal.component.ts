import { Component } from '@angular/core';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-principal',
  imports: [NgIf],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  // Variável para visibilidade dos botões
  btnCadastro:boolean = true;

}
