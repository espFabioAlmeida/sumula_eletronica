import { Injectable } from '@angular/core';
import { Sumula } from './sumula'
import { HttpClient } from '@angular/common/http';
import { Comissao } from './comissao';
import { Cronologia } from './cronologia';
import { CreateEscalacao } from './createEscalacao';
import { CreateRelacao } from './createRelacao';
import { CreateSumula } from './createSumula';
import { Substituicao } from './substituicao';

@Injectable({
  providedIn: 'root'
})
export class SumulaService 
{
  sumulas: Sumula[] = [];
  constructor(private http: HttpClient) { }

  cadastraSumula(sumula: CreateSumula)
  {
    return this.http.post<Number>(`/api/sumula/post`, sumula);
  }

  cadastraComissao(comissao: Comissao)
  {
    return this.http.post<Number>(`/api/comissao/post`, comissao);
  }

  cadastraCronologia(cronologia: Cronologia)
  {
    return this.http.post<Number>(`/api/cronologia/post`, cronologia);
  }

  cadastraEscalacao(createEscalacao: CreateEscalacao)
  {
    return this.http.post<Number>(`/api/escalacao/post`, createEscalacao);
  }

  cadastraRelacao(createRelacao: CreateRelacao[])
  {
    return this.http.post<Number>(`/api/relacao/post`, createRelacao);
  }

  cadastraSubstituicao(substituicao: Substituicao)
  {
    return this.http.post<Number>(`/api/substituicao/post`, substituicao);
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
