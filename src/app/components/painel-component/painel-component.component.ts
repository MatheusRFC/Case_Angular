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
    var user = sessionStorage.getItem('usuario_logado');
    
    //Verifica se o usuário já foi cadastrado pelo tipo de retorno
    if (typeof user != 'string') {
      alert("Usuário Não logado.")
      this.route.navigate(['']);
    }
    
    var mostrar_usuario = document.getElementById("mostrar_usuario");
    const p = document.createElement("p");
    p.textContent = "BEM VINDO(A), "+user;
    mostrar_usuario.appendChild(p);
  }
  

  novo_Lead(){
    this.route.navigate(['novo_lead']);
  }

  logout_Function(){
    sessionStorage.removeItem('usuario_logado');
    this.route.navigate(['']);
  }

}
