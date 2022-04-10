import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-painel-component',
  templateUrl: './painel-component.component.html',
  styleUrls: ['./painel-component.component.css']
})
export class PainelComponentComponent implements OnInit {

  constructor(private route:Router, private titleService:Title) { 
    this.titleService.setTitle("Painel Principal");
  }

  // Lista para armazenamento dos dados provenientes do localstorage.
  lista_Potencial = [];
  lista_confirmados= [];
  r_agendada = [];

  ngOnInit(): void {
    var dados;
    //Variáveis auxiliares
    var lista_Potencial_aux = [];
    var lista_confirmados_aux = [];
    var r_agendada_aux = [];

    /*Verifica todo o localstorage em busca de dados do tipo "Empresa".
     Essa verificação é necessária porque no localstorage também existem
      os dados do tipo "usuário", que é utilizado no login.*/
    Object.keys(localStorage).forEach(function(key){

      dados = localStorage.getItem(key);
      dados = JSON.parse(dados); 

      if (dados.tipo == "empresa"){
        console.log(localStorage.getItem(key));

        /*Se o status do dado do tipo empresa é "Cliente em Potencial", então ele é armazenado 
           na lista auxiliar correspondente. */
        if (dados.status == "Cliente em Potencial"){
          lista_Potencial_aux.push(dados.nome_empresa);
        }
        
        /*Se o status do dado do tipo empresa é "Dados Confirmados", então ele é armazenado 
          na lista auxiliar correspondente. */
        if (dados.status == "Dados Confirmados"){
          lista_confirmados_aux.push(dados.nome_empresa);
        }

          /*Se o status do dado do tipo empresa é "Reunião Agendada", então ele é armazenado 
          na lista auxiliar correspondente. */
        if (dados.status == "Reunião Agendada"){
          r_agendada_aux.push(dados.nome_empresa);
        }

      }
    });

   // Armazena os dados das lista auxiliares nas listas principais de cada tipo de cliente.
   this.lista_Potencial = lista_Potencial_aux;
   this.lista_confirmados = lista_confirmados_aux;
   this.r_agendada = r_agendada_aux;

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

  drop(event: CdkDragDrop<string[]>) {

    //Converte os dados do evento em string e remove o caractere [.
    var anterior_aux = JSON.stringify(event.previousContainer.data).replace("[", "");

    //remove o caractere ].
    anterior_aux = anterior_aux.replace("]", "");

    //Separa os dados do container antigo.
    var anterior = anterior_aux.split(",");
    
    //Se o container antigo é diuferente do atual, então move os dados.
    if (event.previousContainer !== event.container) {

      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex)

        //Converte os dados do evento em string e remove o caractere [.
        var posterior_aux = JSON.stringify(event.container.data).replace("[", "");
        //remove o caractere ].
        posterior_aux = posterior_aux.replace("]", "");

        //Separa os dados do container atual.
        var posterior = posterior_aux.split(",");

        var diferenca;
        
        /* Faz uma busca nos dados do container anterior e no atual
           Essa busca é necessária para capturar o elemento que os dois tem em comum
           Esse elemento é o elemento que mudou de lugar, e é ele que devemos focar para
           atualizar os dados no localstorage.
        */
        for (var i = 0; i<posterior.length; i++){
          for (var j = 0; j<posterior.length; j++){
            if (posterior[i] == anterior[j]){
              diferenca = posterior[i].replace('"', '').replace('"', '');
            }
          }
        }

        /* Pega os dados do item resultado da busca acima (item em comum)
         Esse item é o item que mudou de posição, e precisa ser atualizado.*/
        var dados = localStorage.getItem(diferenca);
        var empresa = JSON.parse(dados);

        /* Se ele está sendo atualizado, e está com o status de "cliente em potencial", então ele passa para 
           o status de "Dados Confirmados".*/
        if (empresa.status == "Cliente em Potencial"){
          empresa.status = "Dados Confirmados";
        }

        /* Se ele está sendo atualizado, e está com o status de "Dados Confirmados", então ele passa para 
          o status de "Reunião Agendada".*/
        else if (empresa.status == "Dados Confirmados"){
          empresa.status = "Reunião Agendada";
        }

        //Depois de todos os ajustes da atualização, grava as mudanças no localstorage.
        localStorage.setItem(diferenca, JSON.stringify(empresa));

    }
  }
}
