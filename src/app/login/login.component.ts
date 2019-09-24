import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ArbitroService } from '../arbitro/arbitro.service';
import { Arbitro } from '../arbitro/arbitro';
import { Login } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{
  arbitros: Arbitro[] = [];
  login: Login = new Login();
  admin: Login = new Login();


  constructor(private router: Router, private arbitroService: ArbitroService) 
  { 
    //Cria usuário Admin
    this.admin.usuario = "ADMIN";
    this.admin.senha = "ADMIN";
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
        this.login = new Login();
        this.router.navigate(['/sumula']);
        return;
      }

      alert("Dados incorretos");
      this.login = new Login();
    }
  }

  validaUsuario()
  {
    this.arbitros.forEach(arbitro => {
      if(arbitro.cpf == this.login.usuario)
      {
        if(arbitro.senha == this.login.senha)
        {
          console.log("Arbitro Logado: ");
          console.log(arbitro.nome);
          return true;
        }
      }
    });

    if(this.login.usuario == this.admin.usuario)
    {
      if(this.login.senha == this.admin.senha)
      {
        console.log("Login Logado");
        return true;
      }
    }

    return false;
  }

  getAritros()
  {
    this.arbitros = this.arbitroService.getArbitros();
  }
}
