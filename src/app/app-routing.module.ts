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
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [ 
{ path: 'arbitro', component: ArbitroComponent, canActivate: [AuthGuardService]},
{ path: 'atleta', component: AtletaComponent, canActivate: [AuthGuardService]},
{ path: 'clube' , component: ClubeComponent, canActivate: [AuthGuardService]},
{ path: 'sumula', component: SumulaComponent, canActivate: [AuthGuardService]},
{ path: 'arbitro-cadastro/:id', component: ArbitroCadastroComponent, canActivate: [AuthGuardService]},
{ path: 'arbitro-cadastro', component: ArbitroCadastroComponent, canActivate: [AuthGuardService]},
{ path: 'clube-cadastro/:id', component: ClubeCadastroComponent, canActivate: [AuthGuardService]},
{ path: 'clube-cadastro', component: ClubeCadastroComponent, canActivate: [AuthGuardService]},
{ path: 'atleta-cadastro/:id', component: AtletaCadastroComponent, canActivate: [AuthGuardService]},
{ path: 'atleta-cadastro', component: AtletaCadastroComponent, canActivate: [AuthGuardService]},
{ path: 'sumula-cadastro', component: SumulaCadastroComponent, canActivate: [AuthGuardService]},
{ path: 'sumula-visualizacao/:id', component: SumulaVisualizacaoComponent, canActivate: [AuthGuardService]},
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
