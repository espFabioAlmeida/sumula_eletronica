import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { ClubeService } from '../clube/clube.service';
import { ArbitroService } from '../arbitro/arbitro.service';
import { AtletaService } from '../atleta/atleta.service';
import { SumulaService } from '../sumula/sumula.service';
import { Clube } from '../clube/clube';
import { Arbitro } from '../arbitro/arbitro';
import { Atleta } from '../atleta/atleta';
import { Sumula } from '../sumula/sumula';


@Component({
  selector: 'app-sumula-cadastro',
  templateUrl: './sumula-cadastro.component.html',
  styleUrls: ['./sumula-cadastro.component.css']
})
export class SumulaCadastroComponent implements OnInit {
  sumula: Sumula = new Sumula();
  clubes: Clube[] = [];
  constructor(private router: Router, private clubeService: ClubeService,
    private arbitroService: ArbitroService, private attletaService: AtletaService,
    private sumulaService: SumulaService) { }

  ngOnInit() 
  {
    this.getClubes();
    this.inicializaSumula();
  }

  onSubmit(formulario: NgForm)
  {
    if(formulario.valid)
    {
      console.log("recebido no Submit");
      console.log(this.sumula);
      this.sumulaService.cadastraSumula(this.sumula);
      this.sumula = new Sumula();
      this.inicializaSumula();

      this.router.navigate(['/sumula']);
    }
  }

  onItemChange(mandante: NgModel)
  {
    console.log("Trocando Local da Partida");
    console.log(mandante.value);
    this.sumula.estadio = this.clubes.find(clube => clube.nome == mandante.value).estadio;
  }


  inicializaSumula()
  {
    this.sumula.placarMandante = 0;
    this.sumula.placarVisitante = 0;
    this.sumula.mandante = "Sem Clube";
    this.sumula.visitante = "Sem Clube";
    this.sumula.relatorioExpulsoes = "Nada a Relatar";
    this.sumula.relatorioObservacoes = "Nada a Relatar";
  }

  getClubes()
  {
    this.clubes = this.clubeService.getClubes();
  }

}
