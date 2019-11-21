import { Injectable, EventEmitter } from '@angular/core';
import { Arbitro } from '../models/arbitro'
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  arbitroLogado: Arbitro = new Arbitro();
  arbitroEstaLogado: Boolean = false;

  mostrarMenuEmitter = new EventEmitter<Arbitro>();

  constructor(private http: HttpClient) { }

  verificarLogin(login: Login)
  {
    return this.http.post<Login>(`/api/login`, login); 
  }


  logarArbitro(usuario: Arbitro)
  {
    this.arbitroLogado = usuario;
    this.arbitroEstaLogado = true;

    this.mostrarMenuEmitter.emit(this.arbitroLogado);
  }

  deslogarArbitro()
  {
    this.arbitroLogado = new Arbitro();
    this.arbitroEstaLogado = false;

    this.mostrarMenuEmitter.emit(this.arbitroLogado);
  }

  getArbitroLogado()
  {
    return this.arbitroLogado;
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
      if(this.arbitroLogado.id == "1")
      {
        return true;
      }
    }
    
    return false;
  }
}
