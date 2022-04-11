import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-novo-lead-component',
  templateUrl: './novo-lead-component.component.html',
  styleUrls: ['./novo-lead-component.component.css']
})
export class NovoLeadComponentComponent implements OnInit {

  constructor(private route:Router, private titleService:Title) { 
    this.titleService.setTitle("Cadastro de Leads");
  }

  ngOnInit(): void {
        //Verifica se o usuário já foi cadastrado pelo tipo de retorno
        var user = sessionStorage.getItem('usuario_logado');
        if (typeof user != 'string') {
          alert("Usuário Não logado.");
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

        /*
    Apaga o conteúdo da <div> responsável pelos erros.
    Essa parte é necessária para evitar acúmulo de erros na tela
    mesmo com os erros corrigidos.
    */
    document.getElementById("campo_mensagens").innerHTML = "";
    document.getElementById("campo_mensagens").innerHTML = "<div class = 'campo_erros' id = 'campo_erros' style = 'font-size: 9pt;color: rgba(255, 0, 0, 0.603);'></div>";

    //Cria a variavel para referencia ao campo de erros.
    var mostrar_erros_usuario = document.getElementById("campo_erros");

    //Declaração das constantes das checkboxes.
    const check_rpa = document.getElementById("customCheck1") as HTMLInputElement;
    const check_produto_digital = document.getElementById("customCheck2") as HTMLInputElement;
    const check_analytics = document.getElementById("customCheck3") as HTMLInputElement;
    const check_bpm = document.getElementById("customCheck4") as HTMLInputElement;

    //Expressão regular para a validação do email.
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    // Variáveis para exibição dos erros.
    var error = '';

    //Verifica se o campo nome da empresa não está vazio e se ele possui pelo menos 4 caracteres.
    if (nome == "" || nome.length < 4){
      error = "• Nome da empresa está vazio ou tem menos de 4 caracteres.\n";
      var p = document.createElement("p");
      p.textContent = error;
      mostrar_erros_usuario.appendChild(p);
    }

    //Verifica se o campo telefone não está vazio e se ele possui pelo menos 4 caracteres.
    if (telefone == "" || telefone.length < 4){
      error = "• Telefone da empresa está vazio ou tem menos de 4 caracteres.\n";
      var a = document.createElement("p");
      a.textContent = error;
      mostrar_erros_usuario.appendChild(a);
    }

    //Verifica se o campo de email é valido utilizando a expressão regular declarada anteriormente.
    if (regexp.test(email) == false){
      error = "• Por favor, digite um email válido.\n";

      var b = document.createElement("p");
      b.textContent = error;
      mostrar_erros_usuario.appendChild(b);
    }

    //Caso todas sejam marcadas, marca novamente a checkbox de "marcar todas"
    if (check_rpa.checked == false && check_produto_digital.checked == false && check_analytics.checked == false && check_bpm.checked == false){
      error = "• Por favor, selecione uma opção de oportunidade.\n";

      var c = document.createElement("p");
      c.textContent = error;
      mostrar_erros_usuario.appendChild(c);
    }

    //Pega o nome de usuário do localstorage.
    var empresa = localStorage.getItem(nome);

    //Verifica se a empresa já foi cadastrado pelo tipo de retorno
    if (typeof empresa === 'string') {
      error = "• Empresa já cadastrada.\n";
    }

    //Verifica se o campo de numero de telefone somente tem números.
    if (/^\d+$/.test(telefone) == false){
      error = "• O campo telefone apenas aceita números.\n";
    }

    else{

      /*
          Apaga o conteúdo da <div> responsável pelos erros.
          Essa parte é necessária para remover os erros e informar que o usuário 
          foi cadastrado com sucesso.
          */
          document.getElementById("campo_mensagens").innerHTML = "";

          //Cria uma div para mostrar que o usuário obteve sucesso no seu cadastro.
          document.getElementById("campo_mensagens").innerHTML = "<div class = 'campo_sucesso' id = 'campo_cadastro_sucesso' style = 'font-size: 12pt; color: rgba(18, 129, 27, 0.753);'></div>";

      //Variáveis para captura de oportunidades.
      var RPA_var = false;
      var PD_var= false;
      var analytics_var = false;
      var BPM_var = false;

      //Verifica quais oportunidades foram selecionadas.
      if (check_rpa.checked == true){
        RPA_var = true;
      }
      if (check_produto_digital .checked == true){
        PD_var= true;
      }
      if (check_analytics.checked == true){
        analytics_var = true;
      }
      if (check_bpm.checked == true){
        BPM_var = true;
      }

      // Cria um array de objetos para gravar no armazenamento local.
      const empresa = {
        tipo: "empresa",
        nome_empresa: nome,
        telefone: telefone,
        email: email,
        status: "Cliente em Potencial",
        RPA: RPA_var,
        PD: PD_var,
        Analytics: analytics_var,
        BPM: BPM_var
      }

      //Grava a empresa no armazenamento local.
      alert("Empresa adicionada com sucesso!");
      localStorage.setItem(nome, JSON.stringify(empresa));

      //Adiciona a mensagem de sucesso ao campo de "login_sucesso".
      var mostrar_sucesso_cadastro = document.getElementById("campo_cadastro_sucesso");
      var sucesso = document.createElement("p");
      sucesso.textContent = "• Empresa cadastrada com sucesso, redirecionando para o painel principal.";
      mostrar_sucesso_cadastro.appendChild(sucesso);

      setTimeout(() => 
      {
        this.route.navigate(['painel']);
      },3000);
    }
  }

  // Função que retorna ao menu principal quando o boetão é clicado.
  voltar_Painel(){
    this.route.navigate(['painel']);
  }

}
