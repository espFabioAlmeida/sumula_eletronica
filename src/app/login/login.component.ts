import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArbitroService } from '../services/arbitro.service';
import { Arbitro } from '../models/arbitro';
import { Login } from '../models/login';
import { LoginService } from '../services/login.service';
import { BehaviorSubject } from 'rxjs';

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
  loginRecebido: Login = new Login();
  usuarioEncontrado: Boolean = false;
  returnUrl: String;

  formulario: FormGroup

  currentUserSubject: BehaviorSubject<Login>;

  constructor(private router: Router, private arbitroService: ArbitroService, 
    private route: ActivatedRoute,
    private loginService: LoginService, private formBuilder: FormBuilder) 
  { 
    //Busca as informações do token no navegador
    this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('currentUser')));

    if(this.currentUserSubject.value != null) //Existe um token no navegador
    {
      this.loginService.logarArbitro(this.currentUserSubject.value); //Seta informações no service

      this.loginService.loginByToken().subscribe(dados =>{ //Solicita ao rest login por token

        this.loginRecebido = dados;
        this.loginService.logarArbitro(this.loginRecebido);

        console.log(this.loginRecebido);
        console.log(this.loginService.getArbitroLogado());

        localStorage.setItem('currentUser', JSON.stringify(this.loginRecebido));
        this.currentUserSubject.next(this.loginRecebido);

        this.router.navigate([this.returnUrl]);
      }, 
      error => { //Token recusado
        console.log("Token recusado");
        localStorage.removeItem('currentUser'); //remove do navegador, pois não serve mais
      });
    }
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
      console.log(this.login);

      this.login.cpf = this.formulario.value.usuario;
      this.login.senha = this.formulario.value.senha;
      
      this.loginService.verificarLogin(this.login).subscribe(dados => {
        
        this.loginRecebido = dados;
        this.loginService.logarArbitro(this.loginRecebido);

        console.log(this.loginRecebido);
        console.log(this.loginService.getArbitroLogado());

        localStorage.setItem('currentUser', JSON.stringify(this.loginRecebido));
        this.currentUserSubject.next(this.loginRecebido);

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
