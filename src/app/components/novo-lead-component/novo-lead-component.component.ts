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
  }

  voltar_Painel(){
    this.route.navigate(['painel']);
  }

}
