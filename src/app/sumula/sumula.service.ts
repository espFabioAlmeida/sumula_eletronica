import { Injectable } from '@angular/core';
import { Sumula } from './sumula'
import { HttpClient } from '@angular/common/http';
import { Comissao } from './comissao';
import { Cronologia } from './cronologia';

@Injectable({
  providedIn: 'root'
})
export class SumulaService 
{
  sumulas: Sumula[] = [];
  constructor(private http: HttpClient) { }

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

  cadastraComissao(comissao: Comissao)
  {
    return this.http.post<Comissao>(`/api/comissao/post`, comissao);
  }

  cadastraCronologia(cronologia: Cronologia)
  {
    return this.http.post<Comissao>(`/api/cronologia/post`, cronologia);
  }

  getSumulas()
  {
    return this.http.get<Sumula[]>(`/api/sumula/list`);
  }

  getSumulaById(id: String)
  {
    return this.http.get<Sumula>(`/api/sumula/${id}`);
  }
}
