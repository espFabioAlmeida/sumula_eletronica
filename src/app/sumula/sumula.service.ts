import { Injectable } from '@angular/core';
import { Sumula } from './sumula'

@Injectable({
  providedIn: 'root'
})
export class SumulaService 
{
  sumulas: Sumula[] = [];
  constructor() { }

  cadastraSumula(sumula: Sumula)
  {
    if(sumula.id == null)
    {
      sumula.id = Math.random().toString(36).substring(2,15) +
      Math.random().toString(36).substring(2,15);
      console.log("Recebido no Sumula Service: ");
      console.log(sumula);
      
      this.sumulas.push(sumula);
      console.log(this.sumulas);
      return;
    }

    console.log("Tentou Editar uma Súmula, essa operação não é válida.")
  }


  getSumulas()
  {
    return this.sumulas;
  }

  getSumulaById(id: String)
  {
    return this.sumulas.find(sumula => sumula.id == id);
  }
}
