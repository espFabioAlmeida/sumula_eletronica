import { Injectable, EventEmitter } from '@angular/core';
import { Arbitro } from '../models/arbitro'
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  arbitroLogado: Login = new Login();
  arbitroEstaLogado: Boolean = false;

  mostrarMenuEmitter = new EventEmitter<Arbitro>();

  constructor(private http: HttpClient) { }

  verificarLogin(login: Login)
  {
    return this.http.post<Login>(`/api/login`, login); 
  }

  loginByToken()
  {
    return this.http.get<Login>(`/api/login/loginByToken`); 
  }

  cancelarToken()
  {
    return this.http.get<boolean>(`/api/login/logoff`); 
  }


  logarArbitro(usuario: Login)
  {
    this.arbitroLogado = usuario;
    this.arbitroEstaLogado = true;

    this.mostrarMenuEmitter.emit(this.arbitroLogado.arbitro);
  }

  deslogarArbitro()
  {
    this.arbitroLogado = new Login();
    this.arbitroEstaLogado = false;

    this.mostrarMenuEmitter.emit(this.arbitroLogado.arbitro);
  }

  getLogin()
  {
    return this.arbitroLogado;
  }

  getArbitroLogado()
  {
    return this.arbitroLogado.arbitro;
  }

  isArbitroLogado()
  {
    if(this.arbitroEstaLogado)
    {
      return true;
    }
    
    return false;
  }

  isAdminLogado()
  {
    if(this.arbitroEstaLogado)
    {
      if(this.arbitroLogado.arbitro.id == "1")
      {
        return true;
      }
    }
    
    return false;
  }
}
