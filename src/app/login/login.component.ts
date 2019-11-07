import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArbitroService } from '../arbitro/arbitro.service';
import { Arbitro } from '../arbitro/arbitro';
import { Login } from './login';
import { LoginService } from './login.service';

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

  formulario: FormGroup

  constructor(private router: Router, private arbitroService: ArbitroService, 
    private loginService: LoginService, private formBuilder: FormBuilder) 
  { 
  }

  ngOnInit() 
  {
    this.getAritros();
    this.iniciaFormulario();
  }

  onSubmit()
  {
    if(this.formulario.valid)
    {    
      console.log("Dados de Login: ")

      this.login.usuario = this.formulario.value.usuario;
      this.login.senha = this.formulario.value.senha;
      
      console.log(this.login);
      console.log(this.login.usuario);
      console.log(this.login.senha);

      if(this.validaUsuario())
      {       
        this.loginService.logarArbitro(this.arbitroLogado);
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
    this.iniciaFormulario();
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
    this.arbitroService.getArbitros().subscribe(dados => 
      {
        this.arbitros = dados;
        this.filtraArbitrosLinha();
        console.log("Arbitros recebidos do service")
        console.log(this.arbitros);
      }
      );
  }

  filtraArbitrosLinha()
  {
    const arbitrosLinha: Arbitro[] = this.arbitros;
    this.arbitros = [];

    arbitrosLinha.forEach(arbitro => {
      if(arbitro.funcao == "Arbitro")
      {
        this.arbitros.push(arbitro);
      }
    });
  }

  verificaCampo(campo)
  {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  iniciaFormulario()
  {
    this.formulario = this.formBuilder.group(
      {
        usuario: [null, Validators.required],

        senha: [null,
          [Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10)]],
      }
    )
  }
}
