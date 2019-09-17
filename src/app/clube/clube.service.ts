import { Injectable } from '@angular/core';
import { Clube } from './clube';

@Injectable({
  providedIn: 'root'
})
export class ClubeService 
{
  clubes: Clube[] = [];
  index: any;
  constructor() { }

  cadastraClube(clube: Clube)
  {
    if(clube.id == null)
    {
      clube.id = Math.random().toString(36).substring(2,15) +
      Math.random().toString(36).substring(2,15);
      console.log("Recebido no Service");
      console.log(clube);
      this.clubes.push(clube);
      console.log(this.clubes);
      return;
    }

    this.index = this.clubes.indexOf(clube);
    this.clubes[this.index] = clube;

    console.log("Clube atualizado");
    console.log(this.index);
  }

  getClubes()
  {
    return this.clubes;
  }

  getClubeById(id: String)
  {
    return this.clubes.find(clube => clube.id = id);
  }
}
