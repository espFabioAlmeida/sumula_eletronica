import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cep } from './cep';

@Injectable({
  providedIn: 'root'
})
export class CepService 
{
  constructor(private http: HttpClient) { }

  cunsultaCep(cep: String)
  {
    cep = cep.replace(/\D/g, ''); //Remove qualquer caracter que não seja dígito

    if(cep.length == 8) //Verifica se possui exatamente 8 dígitos
    {
      return this.http.get<Cep>(`https://viacep.com.br/ws/${cep}/json/`);
    }
  }

}
