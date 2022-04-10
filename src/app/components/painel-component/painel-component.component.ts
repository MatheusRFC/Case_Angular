import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-painel-component',
  templateUrl: './painel-component.component.html',
  styleUrls: ['./painel-component.component.css']
})
export class PainelComponentComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
    //Verifica se o usuário já foi cadastrado pelo tipo de retorno
    var user = sessionStorage.getItem('usuario_logado');
    if (typeof user != 'string') {
      alert("Usuário Não logado.");
      this.route.navigate(['']);
    }

    // Adiciona as boas vindas ao usuário logado.
    var mostrar_usuario = document.getElementById("mostrar_usuario");
    const p = document.createElement("p");
    p.textContent = "BEM VINDO(A), "+user;
    mostrar_usuario.appendChild(p);
  }
  
 // Navega até a página de adição de um novo lead.
  novo_Lead(){
    this.route.navigate(['novo_lead']);
  }

  //Função de logout. Remove da sessionStorage o nome do usuário logado e retorna a tela de login.
  logout_Function(){
    sessionStorage.removeItem('usuario_logado');
    this.route.navigate(['']);
  }

}
