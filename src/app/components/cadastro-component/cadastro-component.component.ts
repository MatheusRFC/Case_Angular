import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-component',
  templateUrl: './cadastro-component.component.html',
  styleUrls: ['./cadastro-component.component.css']
})

export class CadastroComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  //Função que recebe e verifica os dados de cadastro.
  coleta_Dados(nome: string, senha: string, senha_confirm: string){

    // Variáveis para exibição dos erros.
    var error = '';
    var error_existe = false;

    //Expressão regular responsável por definir os parametros da senha.
    let regexp = new RegExp("^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).*$");

    //Verifica se o campo nome não está vazio e se ele possui pelo menos 4 caracteres.
    if (nome == "" || nome.length < 4){
      error = error + "Nome de usuário está vazio ou tem menos de 4 caracteres.\n";
      error_existe = true;
    }

    //Verifica se o campo de senha não esta vazio e se é igual a confirmação
    if (senha != senha_confirm || senha == "" || senha_confirm == ""){
      error = error + "As senhas tem que ser iguais e não podem ser vazias.\n";
      error_existe = true;
    } 

    //Verifica se a senha atente aos requisitos mínimos dispostos na expressão regular.
    if (regexp.test(senha) == false){
      error = error + "As senhas devem conter pelo menos 8 caracteres, uma letra, um número e um caractere especial.\n";
      error_existe = true;
    }

    //Caso exista um ou mais erros, imprime na tela através de um alert.
    if (error_existe == true){
      alert(error);
    }

    //Caso esteja tudo correto com as informações, exibe uma confirmação de usuário cadastrado.
    else {
      alert("Usuário cadastrado com sucesso!");
    }

  }

}
