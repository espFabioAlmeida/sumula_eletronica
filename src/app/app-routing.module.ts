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
import { AuthGuardAdminService } from './guards/auth-guard-admin.service';

const routes: Routes = [ 
{ path: 'arbitro', component: ArbitroComponent, canActivate: [AuthGuardAdminService]},
{ path: 'atleta', component: AtletaComponent, canActivate: [AuthGuardAdminService]},
{ path: 'clube' , component: ClubeComponent, canActivate: [AuthGuardAdminService]},
{ path: 'sumula', component: SumulaComponent, canActivate: [AuthGuardService]},
{ path: 'arbitro-cadastro/:id', component: ArbitroCadastroComponent, canActivate: [AuthGuardAdminService]},
{ path: 'arbitro-cadastro', component: ArbitroCadastroComponent, canActivate: [AuthGuardAdminService]},
{ path: 'clube-cadastro/:id', component: ClubeCadastroComponent, canActivate: [AuthGuardAdminService]},
{ path: 'clube-cadastro', component: ClubeCadastroComponent, canActivate: [AuthGuardAdminService]},
{ path: 'atleta-cadastro/:id', component: AtletaCadastroComponent, canActivate: [AuthGuardAdminService]},
{ path: 'atleta-cadastro', component: AtletaCadastroComponent, canActivate: [AuthGuardAdminService]},
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
