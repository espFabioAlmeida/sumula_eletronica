import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArbitroComponent } from './arbitro/arbitro.component';
import { AppRoutingModule } from './app-routing.module';
import { AtletaComponent } from './atleta/atleta.component';
import { ClubeComponent } from './clube/clube.component';
import { SumulaComponent } from './sumula/sumula.component';

@NgModule({
  declarations: [
    AppComponent,
    ArbitroComponent,
    AtletaComponent,
    ClubeComponent,
    SumulaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
