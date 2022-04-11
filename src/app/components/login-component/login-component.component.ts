import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private route:Router, private titleService:Title) { 
    this.titleService.setTitle("Login");
  }

  ngOnInit(): void {
  }

  coleta_Dados_login(nome: string, senha: string){

    /*
    Apaga o conteúdo da <div> responsável pelos erros.
    Essa parte é necessária para evitar acúmulo de erros na tela
    mesmo com os erros corrigidos.
    */
    document.getElementById("campo_erros").innerHTML = "";

    //Cria um array de objetos
    var usuario = {
      usuario_nome: nome,
      senha: senha,
  }

  //Pega do armazenamento local os dados que tem a chave (nome do usuário) igual ao nome informado.
  var users = localStorage.getItem(nome);
  var mostrar_erros_usuario = document.getElementById("campo_erros");
  var p = document.createElement("p");

  //Verifica se o objeto retornado não é null
  if (typeof users === 'string') {
    usuario = JSON.parse(users) 

    //Caso a senha não corresponda, gera um erro.
    if (usuario.senha != senha){
      p.textContent = "• Usuário ou senha incorretos.";
      mostrar_erros_usuario.appendChild(p);
    }
    else{
      sessionStorage.setItem('usuario_logado', nome);
      this.route.navigate(['painel']);
    }
  }

  //Caso o objeto retornado seja null, o usuário está incorreto.
  else {
    p.textContent = "• Usuário ou senha incorretos.";
    mostrar_erros_usuario.appendChild(p);
  }

  }

}
