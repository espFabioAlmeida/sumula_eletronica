import { Injectable } from '@angular/core';
import { Sumula } from '../models/sumula'
import { HttpClient } from '@angular/common/http';
import { Comissao } from '../models/comissao';
import { Cronologia } from '../models/cronologia';
import { CreateEscalacao } from '../models/createEscalacao';
import { CreateRelacao } from '../models/createRelacao';
import { CreateSumula } from '../models/createSumula';
import { Substituicao } from '../models/substituicao';

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

  cadastraRelacao(createRelacoes: CreateRelacao[])
  {
    return this.http.post<Number[]>(`/api/relacao/post`, createRelacoes);
  }

  cadastraSubstituicao(substituicoes: Substituicao[])
  {
    return this.http.post<Number[]>(`/api/substituicao/post`, substituicoes);
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
