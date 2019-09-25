import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArbitroComponent } from './arbitro/arbitro.component';
import { AppRoutingModule } from './app-routing.module';
import { AtletaComponent } from './atleta/atleta.component';
import { ClubeComponent } from './clube/clube.component';
import { SumulaComponent } from './sumula/sumula.component';
import { ArbitroCadastroComponent } from './arbitro-cadastro/arbitro-cadastro.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ClubeCadastroComponent } from './clube-cadastro/clube-cadastro.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { CepService } from './clube/cep.service';
import { AtletaCadastroComponent } from './atleta-cadastro/atleta-cadastro.component';
import { SumulaCadastroComponent } from './sumula-cadastro/sumula-cadastro.component';
import { SumulaVisualizacaoComponent } from './sumula-visualizacao/sumula-visualizacao.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    ArbitroComponent,
    AtletaComponent,
    ClubeComponent,
    SumulaComponent,
    ArbitroCadastroComponent,
    ClubeCadastroComponent,
    AtletaCadastroComponent,
    SumulaCadastroComponent,
    SumulaVisualizacaoComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
