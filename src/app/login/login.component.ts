import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArbitroService } from '../services/arbitro.service';
import { Arbitro } from '../models/arbitro';
import { Login } from '../models/login';
import { LoginService } from '../services/login.service';

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
  returnUrl: String;

  formulario: FormGroup


  constructor(private router: Router, private arbitroService: ArbitroService, 
    private route: ActivatedRoute,
    private loginService: LoginService, private formBuilder: FormBuilder) 
  { 
  }

  ngOnInit() 
  {
    this.iniciaFormulario();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit()
  {
    if(this.formulario.valid)
    {    
      console.log("Dados de Login: ")

      this.login.cpf = this.formulario.value.usuario;
      this.login.senha = this.formulario.value.senha;
      
      console.log(this.login);
      console.log(this.login.cpf);
      console.log(this.login.senha);

      this.loginService.verificarLogin(this.login).subscribe(dados => {
        
        this.arbitroLogado = dados;
        this.loginService.logarArbitro(this.arbitroLogado);

        this.login = new Login();
        this.arbitroLogado = new Arbitro();

        this.router.navigate([this.returnUrl]);
      },
      error => {
        alert("Dados incorretos");
        this.login = new Login();
        this.arbitroLogado = new Arbitro();
        this.iniciaFormulario();
      })

    }
  }

  onClickLimpar()
  {
    this.iniciaFormulario();
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
