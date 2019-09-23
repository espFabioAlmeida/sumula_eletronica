import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SumulaService } from '../sumula/sumula.service';
import { Sumula } from '../sumula/sumula';
import { Escalacao } from '../sumula/escalacao';
import { Relacao } from '../sumula/relacao';

@Component({
  selector: 'app-sumula-visualizacao',
  templateUrl: './sumula-visualizacao.component.html',
  styleUrls: ['./sumula-visualizacao.component.css']
})
export class SumulaVisualizacaoComponent implements OnInit 
{
  sumula: Sumula = new Sumula();
  escalacaoMandate: Escalacao = new Escalacao();
  escalacaoVisitante: Escalacao = new Escalacao();
  relacoesMandante: Relacao[] = [];
  relacoesVisitante: Relacao[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private sumulaService:SumulaService) { }

  ngOnInit() 
  {
    //Busca a súmula desejada
    this.getSumula();

    //Busca as escalações
    this.escalacaoMandate = this.sumula.escalacaoMandante;
    this.escalacaoVisitante = this.sumula.escalacaoVisitante;

    //Busca todas as relações
    this.relacoesMandante = this.escalacaoMandate.relacoes;
    this.relacoesVisitante = this.escalacaoVisitante.relacoes;
  }

  getSumula()
  {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("Id recebido:");
    console.log(id);

    if(id != null)
    {
      console.log("Nao eh nulo");
      this.sumula = this.sumulaService.getSumulaById(id);
      return;
    }
    console.log("Eh nulo");
    alert("ERRO FATAL! Registro não encontrado")
  }

}
