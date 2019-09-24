import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ArbitroService } from '../arbitro/arbitro.service';
import { Arbitro } from '../arbitro/arbitro';
import { Login } from './login';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{
  arbitroLogado: Arbitro = new Arbitro();
  arbitros: Arbitro[] = [];
  login: Login = new Login();
  usuarioEncontrado: Boolean = false;


  constructor(private router: Router, private arbitroService: ArbitroService, 
    private header: HeaderComponent) 
  { 
  }

  ngOnInit() 
  {
    this.getAritros();
  }

  onSubmit(formulario: NgForm)
  {
    if(formulario.valid)
    {    
      console.log("Dados de Login: ")
      console.log(this.login);
      console.log(this.login.usuario);
      console.log(this.login.senha);

      if(this.validaUsuario())
      {       
        this.header.setArbitroLogado(this.arbitroLogado);
        this.login = new Login();
        this.arbitroLogado = new Arbitro();
        this.router.navigate(['/sumula']);
        return;
      }

      alert("Dados incorretos");
      this.login = new Login();
      this.arbitroLogado = new Arbitro();
    }
  }

  onClickLimpar()
  {
    this.login = new Login();
  }

  validaUsuario()
  {
    this.usuarioEncontrado = false;    
    this.arbitros.forEach(arbitro => {
      if(arbitro.cpf == this.login.usuario)
      {
        if(arbitro.senha == this.login.senha)
        {
          console.log("Arbitro Logado: ");
          console.log(arbitro.nome);
          this.arbitroLogado = arbitro;
          this.usuarioEncontrado = true;
        }
      }
    });

    if(this.usuarioEncontrado) return true;

    return false;
  }

  getAritros()
  {
    this.arbitros = this.arbitroService.getArbitrosLinha();
    console.log("Arbitros recebidos do service")
    console.log(this.arbitros);
  }
}
