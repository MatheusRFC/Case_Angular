import { Component, OnInit } from '@angular/core';
import {Router, Routes } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  coleta_Dados_login(nome: string, senha: string){

    //Cria um array de objetos
    var usuario = {
      usuario_nome: nome,
      senha: senha,
  }

  //Pega do armazenamento local os dados que tem a chave (nome do usuário) igual ao nome informado.
  var users = localStorage.getItem(nome);

  //Verifica se o objeto retornado não é null
  if (typeof users === 'string') {
    usuario = JSON.parse(users) 

    //Caso a senha não corresponda, gera um erro.
    if (usuario.senha != senha){
      alert("Usuário ou senha incorretos");
    }
    else{
      sessionStorage.setItem('usuario_logado', nome);
      this.route.navigate(['painel']);
    }
  }

  //Caso o objeto retornado seja null, o usuário está incorreto.
  else {
    alert("Usuário ou senha incorretos");
  }

  }

}
