import { BrowserModule } from '@angular/platform-browser';
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

@NgModule({
  declarations: [
    AppComponent,
    ArbitroComponent,
    AtletaComponent,
    ClubeComponent,
    SumulaComponent,
    ArbitroCadastroComponent,
    ClubeCadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
