import { Injectable } from '@angular/core';
import { Atleta } from './atleta';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtletaService 
{
  atletas: Atleta[] = [];
  index: any;
  constructor(private http: HttpClient) { }

  cadastraAtleta(atleta:Atleta)
  {
    /*if(atleta.id == null)
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
    */
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
    const atletasPorClube: Atleta[] = [];

    if(id) //Busca somente se o id for válido
    {
      this.atletas.forEach(atleta => 
      {
        if(atleta.idClube == id)
        {
          atletasPorClube.push(atleta);
        }
      });
    }

    return atletasPorClube;
  }
}
