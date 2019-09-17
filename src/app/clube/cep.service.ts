import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cep } from './cep';

@Injectable({
  providedIn: 'root'
})
export class CepService 
{
  resultado: Cep = new Cep();

  constructor(private http:HttpClient) { }


  buscaCep()
  {
    console.log("Buscando CEP teste");
    //console.log(this.http.get(`https://viacep.com.br/ws/89053145/json/`)
   // .subscribe(data => this.resultado = this.converterRespostaParaCep(data)));
  }

  private converterRespostaParaCep(cepNaResposta):Cep{
    let cep = new Cep();
    cep.cep = cepNaResposta.cep;
    cep.logradouro = cepNaResposta.logradouro;
    cep.complemento = cepNaResposta.complemento;
    cep.bairro = cepNaResposta.bairro;
    cep.cidade = cepNaResposta.localidade;
    cep.estado = cepNaResposta.uf;

    return cep;
  }

}
