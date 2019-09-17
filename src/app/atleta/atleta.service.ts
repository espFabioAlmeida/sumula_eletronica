import { Injectable } from '@angular/core';
import { Atleta } from './atleta';

@Injectable({
  providedIn: 'root'
})
export class AtletaService 
{
  atletas: Atleta[] = [];
  index: any;
  constructor() { }

  cadastraAtleta(atleta:Atleta)
  {
    if(atleta.id == null)
    {
      atleta.id = Math.random().toString(36).substring(2,15) +
      Math.random().toString(36).substring(2,15);
      console.log("Recebido no Atleta Service: ");
      console.log(atleta);
      this.atletas.push(atleta);
      console.log(this.atletas);
      return;
    }
    this.index = this.atletas.indexOf(atleta);
    this.atletas[this.index] = atleta;
  }

  getAtletas()
  {
    return this.atletas;
  }

  getAtletaById(id:String)
  {
    return this.atletas.find(atleta => atleta.id == id);
  }
}
