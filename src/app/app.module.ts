import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { CadastroComponentComponent } from './components/cadastro-component/cadastro-component.component';
import { PainelComponentComponent } from './components/painel-component/painel-component.component';
import { NovoLeadComponentComponent } from './components/novo-lead-component/novo-lead-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    CadastroComponentComponent,
    PainelComponentComponent,
    NovoLeadComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
