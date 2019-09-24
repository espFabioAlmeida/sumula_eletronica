import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbitroComponent } from './arbitro/arbitro.component';
import { AtletaComponent } from './atleta/atleta.component';
import { ClubeComponent } from './clube/clube.component';
import { SumulaComponent } from './sumula/sumula.component';
import { ArbitroCadastroComponent } from './arbitro-cadastro/arbitro-cadastro.component';
import { ClubeCadastroComponent } from './clube-cadastro/clube-cadastro.component';
import { AtletaCadastroComponent } from './atleta-cadastro/atleta-cadastro.component';
import { SumulaCadastroComponent } from './sumula-cadastro/sumula-cadastro.component';
import { SumulaVisualizacaoComponent } from './sumula-visualizacao/sumula-visualizacao.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [ 
{ path: 'arbitro', component: ArbitroComponent},
{ path: 'atleta', component: AtletaComponent},
{ path: 'clube' , component: ClubeComponent},
{ path: 'sumula', component: SumulaComponent},
{ path: 'arbitro-cadastro/:id', component: ArbitroCadastroComponent},
{ path: 'arbitro-cadastro', component: ArbitroCadastroComponent},
{ path: 'clube-cadastro/:id', component: ClubeCadastroComponent},
{ path: 'clube-cadastro', component: ClubeCadastroComponent},
{ path: 'atleta-cadastro/:id', component: AtletaCadastroComponent},
{ path: 'atleta-cadastro', component: AtletaCadastroComponent},
{ path: 'sumula-cadastro', component: SumulaCadastroComponent},
{ path: 'sumula-visualizacao/:id', component: SumulaVisualizacaoComponent},
{ path: 'login', component : LoginComponent },
{ path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
