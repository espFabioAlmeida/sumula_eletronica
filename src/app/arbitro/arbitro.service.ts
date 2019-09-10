import { Injectable } from '@angular/core';
import { Arbitro } from './arbitro';

@Injectable({
  providedIn: 'root'
})
export class ArbitroService 
{
  arbitros: Arbitro[] = [];

  constructor() { }

  cadastraArbitro(arbitro: Arbitro)
  {
    console.log("Recebido no Arbitro Service: ");
    console.log(arbitro);
    this.arbitros.push(arbitro);
    console.log(this.arbitros);
  }

  getArbitros()
  {
    return this.arbitros;
  }

  getArbitroById(id: String)
  {
    return this.arbitros.find(arbitro => arbitro.id == id);
  }
}
