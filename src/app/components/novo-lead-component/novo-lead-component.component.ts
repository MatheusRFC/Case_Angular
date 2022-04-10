import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-novo-lead-component',
  templateUrl: './novo-lead-component.component.html',
  styleUrls: ['./novo-lead-component.component.css']
})
export class NovoLeadComponentComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
        //Verifica se o usuário já foi cadastrado pelo tipo de retorno
        var user = sessionStorage.getItem('usuario_logado');
        if (typeof user != 'string') {
          alert("Usuário Não logado.")
          this.route.navigate(['']);
        }
  }

  //Função responsável por verificar se o botão de marcar ou desmarcar todos está ativado.
  verifica_Checkboxes(){

    const check_todos = document.getElementById("customCheck0") as HTMLInputElement;
    const check_rpa = document.getElementById("customCheck1") as HTMLInputElement;
    const check_produto_digital = document.getElementById("customCheck2") as HTMLInputElement;
    const check_analytics = document.getElementById("customCheck3") as HTMLInputElement;
    const check_bpm = document.getElementById("customCheck4") as HTMLInputElement;

    // Se o botão está marcado, então todos os itens serão marcados como "checked".
    if (check_todos.checked == true){
      check_rpa.checked = true;
      check_produto_digital.checked = true;
      check_analytics.checked = true;
      check_bpm.checked = true;
    }

    // Se o botão está marcado, então todos os itens serão marcados como "unchecked".
    else if (check_todos.checked == false){
      check_rpa.checked = false;
      check_produto_digital.checked = false;
      check_analytics.checked = false;
      check_bpm.checked = false;
    }

  }

  //Verifica individualmente caso alguma checkbox seja desmarcada ou marcada.
  verifica_Checkboxes_individual(){

    const check_todos = document.getElementById("customCheck0") as HTMLInputElement;
    const check_rpa = document.getElementById("customCheck1") as HTMLInputElement;
    const check_produto_digital = document.getElementById("customCheck2") as HTMLInputElement;
    const check_analytics = document.getElementById("customCheck3") as HTMLInputElement;
    const check_bpm = document.getElementById("customCheck4") as HTMLInputElement;

    // Caso alguma checkbox seja desmarcada, desmarca o botão de "marcar todas".
    if (check_rpa.checked == false || check_produto_digital.checked == false || check_analytics.checked == false || check_bpm.checked == false){
      check_todos.checked = false;
    }

    //Caso todas sejam marcadas, marca novamente a checkbox de "marcar todas"
    if (check_rpa.checked == true && check_produto_digital.checked == true && check_analytics.checked == true && check_bpm.checked == true){
      check_todos.checked = true;
    }
  }


  grava_Lead(nome: string, telefone: string, email: string){

    //Expressão regular para a validação do email.
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    // Variáveis para exibição dos erros.
    var error = '';
    var error_existe = false;

    if (nome == "" || nome.length < 4){
      error = error + "Nome da empresa está vazio ou tem menos de 4 caracteres.\n";
      error_existe = true;
    }

    if (telefone == "" || telefone.length < 4){
      error = error + "Telefone da empresa está vazio ou tem menos de 4 caracteres.\n";
      error_existe = true;
    }

    if (regexp.test(email) == false){
      error = error + "Por favor, digite um email válido.\n";
      error_existe = true;
    }

    //Caso exista um ou mais erros, imprime na tela através de um alert.
    if (error_existe == true){
      alert(error);
    }

  }

  // Função que retorna ao menu principal quando o boetão é clicado.
  voltar_Painel(){
    this.route.navigate(['painel']);
  }

}
