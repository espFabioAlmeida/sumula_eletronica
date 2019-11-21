import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SumulaService } from '../services/sumula.service';
import { Sumula } from '../models/sumula';
import { Escalacao } from '../models/escalacao';
import { Relacao } from '../models/relacao';

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

  versaoImpressao: Boolean = false;

  dataString: String;
  horaString: String;

  constructor(private route: ActivatedRoute, private router: Router, private sumulaService:SumulaService) { }

  ngOnInit() 
  {
    //Busca a súmula desejada
    this.getSumula();
  }

  trocaVersao()
  {
    this.versaoImpressao = !this.versaoImpressao;
  }

  getSumula()
  {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("Id recebido:");
    console.log(id);

    if(id != null)
    {
      console.log("Nao eh nulo");
      //this.sumula = this.sumulaService.getSumulaById(id);
      this.sumulaService.getSumulaById(id).subscribe(dados =>
        {
          this.sumula = dados;
          this.sumula.substituicoesMandante = [];
          this.sumula.substituicoesVisitante = [];

          console.log("Sumula Lida")
          console.log(this.sumula);

          //Separa as substituições
          this.sumula.substituicoes.forEach(subs => {
            if(subs.equipeMandante) this.sumula.substituicoesMandante.push(subs);
            else this.sumula.substituicoesVisitante.push(subs);
          })

          //Busca as escalações
          this.escalacaoMandate = this.sumula.escalacaoMandante;
          this.escalacaoVisitante = this.sumula.escalacaoVisitante;

          //Busca todas as relações
          this.relacoesMandante = this.escalacaoMandate.relacoes;
          this.relacoesVisitante = this.escalacaoVisitante.relacoes;

          //Calcula os gols
          this.sumula.placarMandante = 0;
          this.sumula.placarVisitante = 0;

          this.relacoesMandante.forEach(relacao =>{
            this.sumula.placarMandante += relacao.gol;
          })

          this.relacoesVisitante.forEach(relacao =>{
            this.sumula.placarVisitante += relacao.gol;
          })

          this.mascaraDataHora(this.sumula.data);
        })
      return;
    }
    console.log("Eh nulo");
    alert("ERRO FATAL! Registro não encontrado")
  }

  mascaraDataHora(data: Date)
  {
    const toString: String = data.toString();

    this.dataString = "" + toString.substring(8,10) + "/" + toString.substring(5,7) + "/" + toString.substring(0,4);
    this.horaString = "" + toString.substring(11,13) + ":" + toString.substring(14,16);
  }

}
