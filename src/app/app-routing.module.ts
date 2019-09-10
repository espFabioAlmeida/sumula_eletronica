import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbitroComponent } from './arbitro/arbitro.component';
import { AtletaComponent } from './atleta/atleta.component';
import { ClubeComponent } from './clube/clube.component';
import { SumulaComponent } from './sumula/sumula.component';
import { ArbitroCadastroComponent } from './arbitro-cadastro/arbitro-cadastro.component';

const routes: Routes = [ 
{ path: 'arbitro', component: ArbitroComponent},
{ path: 'atleta', component: AtletaComponent},
{ path: 'clube' , component: ClubeComponent},
{ path: 'sumula', component: SumulaComponent},
{ path: 'arbitro-cadastro/:id', component: ArbitroCadastroComponent},
{ path: 'arbitro-cadastro', component: ArbitroCadastroComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
