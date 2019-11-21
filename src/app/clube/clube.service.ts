import { Injectable } from '@angular/core';
import { Clube } from '../models/clube';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClubeService 
{
  clubes: Clube[] = [];
  index: any;
  constructor(private http: HttpClient) { }

  cadastraClube(clube: Clube)
  {
    console.log("Recebido no Service");
    console.log(clube);

    console.log("Metodo POST");
    return this.http.post<String>(`/api/clube/post`, clube); 
  }

  atualizaClube(clube: Clube)
  {
    console.log("Recebido no Service");
    console.log(clube);

    console.log("Metodo PUT");
    return this.http.put<String>(`/api/clube/put/${clube.id}`, clube); 
  }

  getClubes()
  {
    return this.http.get<Clube[]>(`/api/clube/list`);
  }

  getClubeById(id: String)
  {
    return this.http.get<Clube>(`/api/clube/${id}`);
  }
}
