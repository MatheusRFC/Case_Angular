import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-cadastro-component',
  templateUrl: './cadastro-component.component.html',
  styleUrls: ['./cadastro-component.component.css']
})

export class CadastroComponentComponent implements OnInit {

  constructor(private route:Router, private titleService:Title) { 
    this.titleService.setTitle("Cadastro de Usuários");
  }

  ngOnInit(): void {
    
  }

  voltar_Login(){
    this.route.navigate(['']);
  }

  //Função que recebe e verifica os dados de cadastro.
  coleta_Dados(nome: string, senha: string, senha_confirm: string){

    /*
    Apaga o conteúdo da <div> responsável pelos erros.
    Essa parte é necessária para evitar acúmulo de erros na tela
    mesmo com os erros corrigidos.
    */
    document.getElementById("campo_erros").innerHTML = "";

    //Pega o nome de usuário do localstorage.
    var users = localStorage.getItem(nome);

    //Verifica se o usuário já foi cadastrado pelo tipo de retorno
    if (typeof users === 'string') {
      alert("Usuário já cadastrado.")
    }

    //Caso o usuário não esteja cadastrado, o script o cadastra.
    else{

      // Perga a div "campo_erros" para adicionar os erros caso existam.
      var mostrar_usuario = document.getElementById("campo_erros");
      var p = document.createElement("p");

      var users = localStorage.getItem(nome);
      //Cria um array de objetos
      const usuario = {
        tipo: "usuario",
        usuario_nome: nome,
        senha: senha,
      }

      // Variáveis para exibição dos erros.
      var error = '';
      var error_existe = false;

      //Expressão regular responsável por definir os parametros da senha.
      let regexp = new RegExp("^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[@#$%^&+=*>!<_`-]).*$");

      //Verifica se o campo nome não está vazio e se ele possui pelo menos 4 caracteres.
      if (nome == "" || nome.length < 4){
        error = error + "• Nome de usuário está vazio ou tem menos de 4 caracteres.";
        p.textContent = error;
        mostrar_usuario.appendChild(p);
      }

      //Verifica se o campo de senha não esta vazio e se é igual a confirmação
      if (senha != senha_confirm || senha == "" || senha_confirm == ""){
        error = "• As senhas tem que ser iguais e não podem ser vazias.";

        var b = document.createElement("p");
        b.textContent = error;
        mostrar_usuario.appendChild(b);
      } 

      //Verifica se a senha atente aos requisitos mínimos dispostos na expressão regular.
      if (regexp.test(senha) == false){
        error = "• As senhas devem conter pelo menos 8 caracteres, uma letra, um número e um caractere especial.";

        var c = document.createElement("p");
        c.textContent = error;
        mostrar_usuario.appendChild(c);
      }

      //Caso esteja tudo correto com as informações, exibe uma confirmação de usuário cadastrado.
      else {
          alert("Usuário cadastrado com sucesso!");
          localStorage.setItem(nome, JSON.stringify(usuario));
          this.route.navigate(['']);
      }
    }
  }

}
