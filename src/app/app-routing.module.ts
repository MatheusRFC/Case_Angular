import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { CadastroComponentComponent } from './components/cadastro-component/cadastro-component.component';
import { PainelComponentComponent } from './components/painel-component/painel-component.component';
import { NovoLeadComponentComponent } from './components/novo-lead-component/novo-lead-component.component';

const routes: Routes = [
  {path: '', component: LoginComponentComponent},
  {path: 'cadastro', component: CadastroComponentComponent},
  {path: 'painel', component: PainelComponentComponent},
  {path: 'novo_lead', component: NovoLeadComponentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
