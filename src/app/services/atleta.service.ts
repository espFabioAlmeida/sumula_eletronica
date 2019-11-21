import { Injectable } from '@angular/core';
import { Atleta } from '../models/atleta';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtletaService 
{
  atletas: Atleta[] = [];
  index: any;
  constructor(private http: HttpClient) { }

  cadastraAtleta(atleta: Atleta)
  {
    console.log("Recebido no Atleta Service: ");
    console.log(atleta);

    console.log("Metodo POST");
    return this.http.post<String>(`/api/atleta/post`, atleta); 
  }

  atualizaAtleta(atleta: Atleta)
  {
    console.log("Recebido no Atleta Service: ");
    console.log(atleta);
    
    console.log("Metodo PUT")
    return this.http.put<String>(`/api/atleta/put/${atleta.id}`, atleta);  
  }

  getAtletas()
  {
    return this.http.get<Atleta[]>(`/api/atleta/list`);
  }

  getAtletaById(id:String)
  {
    return this.http.get<Atleta>(`/api/atleta/${id}`);
  }

  getAtletasByClube(id: String)
  {
    if(id) //Busca somente se o id for válido
    {
      return this.http.get<Atleta[]>(`/api/atleta/${id}/clube`);
    }
  }
}
