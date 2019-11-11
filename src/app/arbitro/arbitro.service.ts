import { Injectable } from '@angular/core';
import { Arbitro } from './arbitro';
import { ArbitroCategoria } from './arbitroCategoria';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArbitroService 
{
  arbitros: Arbitro[] = [];
  arbitrosAssistentes: Arbitro[] = [];
  arbitrosLinha: Arbitro[] = [];
  categorias: ArbitroCategoria[] = [];
  index: any;

  constructor(private http: HttpClient) 
  { 
    this.criaCategorias();   
  }

  cadastraArbitro(arbitro: Arbitro)
  {
    arbitro.categoria = this.categorias.find(categoria => 
      categoria.id == arbitro.idCategoria).nome;
    console.log("Recebido no Arbitro Service: ");
    console.log(arbitro);

    console.log("Metodo POST");
    return this.http.post<String>(`/api/arbitro/post`, arbitro);  
  }

  atualizaArbitro(arbitro: Arbitro)
  {
    arbitro.categoria = this.categorias.find(categoria => 
      categoria.id == arbitro.idCategoria).nome;

    console.log("Recebido no Arbitro Service: ");
    console.log(arbitro); 
    
    console.log("Metodo PUT");

    return this.http.put<String>(`/api/arbitro/put/${arbitro.id}`, arbitro); 
  }

  getArbitros()
  {
    return this.http.get<Arbitro[]>(`/api/arbitro/list`);
  }

  getArbitrosById(id: String)
  {
    return this.http.get<Arbitro>(`/api/arbitro/${id}`);
  }

  getCategorias()
  {
    return this.categorias;
  }

  getIdCatergoriaByName(nome: String)
  {
    return this.categorias.find(categoria => categoria.nome == nome).id;
  }

  /*
  getArbitrosLinha()
  {
    this.arbitrosLinha = [];

    this.arbitros.forEach(arbitro => {
      if(arbitro.funcao == "Arbitro")
      {
        this.arbitrosLinha.push(arbitro);
      }
    });

    return this.arbitrosLinha;
  }*/

  getArbitrosAssistentes()
  {
    return this.http.get<Arbitro[]>(`/api/arbitro/list/assistentes`);
  }

  getArbitroById(id: String)
  {
    return this.arbitros.find(arbitro => arbitro.id == id);
  }

  criaCategorias()
  {
    const liga: ArbitroCategoria = new ArbitroCategoria();
    const fcf: ArbitroCategoria = new ArbitroCategoria();
    const cbf: ArbitroCategoria = new ArbitroCategoria();
    const fifa: ArbitroCategoria = new ArbitroCategoria();

    liga.id = "1";
    liga.nome = "LVND";
    fcf.id = "2";
    fcf.nome = "FCF";
    cbf.id = "3";
    cbf.nome = "CBF";
    fifa.id = "4";
    fifa.nome = "FIFA";

    this.categorias.push(liga);
    this.categorias.push(fcf);
    this.categorias.push(cbf);
    this.categorias.push(fifa);
  }
}
