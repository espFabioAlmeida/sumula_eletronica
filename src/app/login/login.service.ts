import { Injectable } from '@angular/core';
import { Arbitro } from '../arbitro/arbitro';

@Injectable({
  providedIn: 'root'
})
export class LoginService 
{
  arbitroLogado: Arbitro = new Arbitro();
  constructor() { }

  logarArbitro(arbitro: Arbitro)
  {
    this.arbitroLogado = arbitro;
    console.log("Arbitro Logado Recebido no Service");
    console.log(this.arbitroLogado.nome);
  }

  deslogarArbitro()
  {
    this.arbitroLogado = new Arbitro();
  }
}
