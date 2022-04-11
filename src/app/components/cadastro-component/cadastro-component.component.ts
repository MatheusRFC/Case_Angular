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
    document.getElementById("campo_mensagens").innerHTML = "";

    // Perga a div "campo_erros" para adicionar os erros caso existam.
    document.getElementById("campo_mensagens").innerHTML = "<div class = 'campo_erros' id = 'campo_erros' style = 'font-size: 9pt;color: rgba(255, 0, 0, 0.603);'></div>";
    var mostrar_erros_usuario = document.getElementById("campo_erros");

    //Pega o nome de usuário do localstorage.
    var users = localStorage.getItem(nome);

    //Verifica se o usuário já foi cadastrado pelo tipo de retorno
    if (typeof users === 'string') {

      var a = document.createElement("p");
      a.textContent = "• Usuário já cadastrado.";
      mostrar_erros_usuario.appendChild(a);
      
    }

    //Caso o usuário não esteja cadastrado, o script o cadastra.
    else{

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
      let regexp = new RegExp("^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*['/;:,.)(~|}{?@#$%^&+=*>!<_`-]).*$");

      // Verifica se o campo nome não está vazio e se ele possui pelo menos 4 caracteres.
      // Caso existam erros, os mesmos são adicionados a div de erros.
      if (nome == "" || nome.length < 4){
        error = "• Nome de usuário está vazio ou tem menos de 4 caracteres.";

        var p = document.createElement("p");
        p.textContent = error;
        mostrar_erros_usuario.appendChild(p);
      }

      // Verifica se o campo de senha não esta vazio e se é igual a confirmação.
      // Caso existam erros, os mesmos são adicionados a div de erros.
      if (senha != senha_confirm || senha == "" || senha_confirm == ""){
        error = "• As senhas tem que ser iguais e não podem ser vazias.";

        var b = document.createElement("p");
        b.textContent = error;
        mostrar_erros_usuario.appendChild(b);
      } 

      // Verifica se a senha atente aos requisitos mínimos dispostos na expressão regular.
      // Caso existam erros, os mesmos são adicionados a div de erros.
      if (regexp.test(senha) == false){
        error = "• As senhas devem conter pelo menos 8 caracteres, uma letra, um número e um caractere especial.";

        var c = document.createElement("p");
        c.textContent = error;
        mostrar_erros_usuario.appendChild(c);
      }

      //Caso esteja tudo correto com as informações, exibe uma confirmação de usuário cadastrado.
      else {

          /*
          Apaga o conteúdo da <div> responsável pelos erros.
          Essa parte é necessária para remover os erros e informar que o usuário 
          foi cadastrado com sucesso.
          */
          document.getElementById("campo_mensagens").innerHTML = "";

          //Cria uma div para mostrar que o usuário obteve sucesso no seu cadastro.
          document.getElementById("campo_mensagens").innerHTML = "<div class = 'campo_sucesso' id = 'campo_login_sucesso' style = 'font-size: 9pt; color: rgba(18, 129, 27, 0.753);'></div>";

          //Adiciona a mensagem de sucesso ao campo de "login_sucesso".
          var mostrar_sucesso_cadastro = document.getElementById("campo_login_sucesso");
          var sucesso = document.createElement("p");
          sucesso.textContent = "• Usuário cadastrado com sucesso, redirecionando para o login.";
          mostrar_sucesso_cadastro.appendChild(sucesso);

          localStorage.setItem(nome, JSON.stringify(usuario));
          setTimeout(() => 
          {
            this.route.navigate(['']);
          },3000);
      }
    }
  }

}
