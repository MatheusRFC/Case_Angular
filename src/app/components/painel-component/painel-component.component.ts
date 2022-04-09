import { Component, OnInit } from '@angular/core';
import {Router, Routes } from '@angular/router';
import { NovoLeadComponentComponent } from '../novo-lead-component/novo-lead-component.component';

const routes: Routes = [
  {path: 'novo_lead', component: NovoLeadComponentComponent}
];

@Component({
  selector: 'app-painel-component',
  templateUrl: './painel-component.component.html',
  styleUrls: ['./painel-component.component.css']
})
export class PainelComponentComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  novo_Lead(){
    this.route.navigate(['novo_lead']);
  }

}
