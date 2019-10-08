import { Injectable, EventEmitter } from '@angular/core';
import { Arbitro } from '../arbitro/arbitro'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  arbitroLogado: Arbitro = new Arbitro();
  arbitroEstaLogado: Boolean = false;

  mostrarMenuEmitter = new EventEmitter<Arbitro>();

  constructor() { }

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
    return this.arbitroEstaLogado;
  }

  isAdminLogado()
  {
    if(this.arbitroEstaLogado)
    {
      if(this.arbitroLogado.nome == "ADMIN")
      {
        return true;
      }
    }
    
    return false;
  }
}
