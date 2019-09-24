import { Injectable } from '@angular/core';
import { Arbitro } from './arbitro';
import { ArbitroCategoria } from './arbitroCategoria';

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

  constructor() 
  { 
    //Categorias cadastradas (remover depois que tiver o serviço)
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

  cadastraArbitro(arbitro: Arbitro)
  {
    
    if(arbitro.id == null)
    {
      arbitro.id = Math.random().toString(36).substring(2,15) +
      Math.random().toString(36).substring(2,15);

      //Busca o nome pelo id
      arbitro.categoria = this.categorias.find(categoria => 
        categoria.id == arbitro.idCategoria).nome;

      console.log("Recebido no Arbitro Service: ");
      console.log(arbitro);

      this.arbitros.push(arbitro);
      console.log(this.arbitros);
      return;
    }

    this.index = this.arbitros.indexOf(arbitro);
    this.arbitros[this.index] = arbitro;
    
  }

  getArbitros()
  {
    return this.arbitros;
  }

  getCategorias()
  {
    return this.categorias;
  }

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
  }

  getArbitrosAssistentes()
  {
    this.arbitrosAssistentes = [];

    this.arbitros.forEach(arbitro => {
      if(arbitro.funcao == "Assistente")
      {
        this.arbitrosAssistentes.push(arbitro);
      }
    });

    return this.arbitrosAssistentes;
  }

  getArbitroById(id: String)
  {
    return this.arbitros.find(arbitro => arbitro.id == id);
  }
}
