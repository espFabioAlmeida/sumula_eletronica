import { Injectable } from '@angular/core';
import { Arbitro } from './arbitro';

@Injectable({
  providedIn: 'root'
})
export class ArbitroService 
{
  arbitros: Arbitro[] = [];
  index: any;

  constructor() { }

  cadastraArbitro(arbitro: Arbitro)
  {
    
    if(arbitro.id == null)
    {
      arbitro.id = Math.random().toString(36).substring(2,15) +
      Math.random().toString(36).substring(2,15);
      console.log("Recebido no Arbitro Service: ");
      console.log(arbitro);
      this.arbitros.push(arbitro);
      console.log(this.arbitros);
      return;
    }

    this.index = this.arbitros.indexOf(arbitro);
    this.arbitros[this.index] = arbitro;
    
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
