import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Cep } from '../models/cep';

@Injectable({
  providedIn: 'root'
})
export class CepService 
{
  http: HttpClient;

  constructor(private handler: HttpBackend) 
  {   
    this.http = new HttpClient(handler); //Cria o própio http client para contornar o JWT interceptor
  }

  cunsultaCep(cep: String)
  {
    if(cep != null)
    {
      cep = cep.replace(/\D/g, ''); //Remove qualquer caracter que não seja dígito

      if(cep.length == 8) //Verifica se possui exatamente 8 dígitos
      {
        return this.http.get<Cep>(`https://viacep.com.br/ws/${cep}/json/`);
      }
    }
  }

}
