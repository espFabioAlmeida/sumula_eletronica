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
import { Escalacao } from '../sumula/escalacao';
import { Relacao } from '../sumula/relacao';


@Component({
  selector: 'app-sumula-cadastro',
  templateUrl: './sumula-cadastro.component.html',
  styleUrls: ['./sumula-cadastro.component.css']
})
export class SumulaCadastroComponent implements OnInit {
  sumula: Sumula = new Sumula();
  clubes: Clube[] = [];
  arbitros: Arbitro[] = [];
  atletas: Atleta[] = [];

  escalacaoMandante: Escalacao = new Escalacao();
  escalacaoVisitante: Escalacao = new Escalacao();
  relacoesMandante: Relacao[] = [];
  relacoesVisitante: Relacao[] = [];
  inserirRelacaoMandante: Relacao = new Relacao();
  inserirRelacaoVisitante: Relacao = new Relacao();

  constructor(private router: Router, private clubeService: ClubeService,
    private arbitroService: ArbitroService, private atletaService: AtletaService,
    private sumulaService: SumulaService) { }

  ngOnInit() 
  {
    this.getAssistentes();
    this.getClubes();
    this.getAtletasByClubes();
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

  onClickInserirRelacaoMandante()
  {
    const obj: Relacao = this.relacoesMandante.find
    (relacao => relacao.numero == this.inserirRelacaoMandante.numero );

    if(this.inserirRelacaoMandante.nome != "Selecionar" 
    && this.inserirRelacaoMandante.numero > 0
    && this.inserirRelacaoMandante.gols >= 0
    && !obj)
    {
      console.log("Atleta Válido");
      this.relacoesMandante.push(this.inserirRelacaoMandante);
      this.inserirCartoesMandante(); 
      this.atualizaPlacarFinal();
      this.inicializaInserirRelacaoMandante();
      return;
    }
    console.log("Nenhum Selecionado")
    alert("Verifique os campos de inserção e tente novamente");
  }

  onClickExcluirRelacaoMandante(apagar: any)
  {
    console.log("Registro para remoção recebido");
    console.log(apagar);
    const obj: Relacao = this.relacoesMandante.find(relacao => relacao.numero == apagar);
    const index: number = this.relacoesMandante.indexOf(obj);

    if (index !== -1) 
    {
      this.relacoesMandante.splice(index, 1);
      this.atualizaPlacarFinal();
    } 
  }


  onClickInserirRelacaoVisitante()
  {
    const obj: Relacao = this.relacoesVisitante.find
    (relacao => relacao.numero == this.inserirRelacaoVisitante.numero );

    if(this.inserirRelacaoVisitante.nome != "Selecionar" 
    && this.inserirRelacaoVisitante.numero > 0
    && this.inserirRelacaoVisitante.gols >= 0
    && !obj)
    {
      console.log("Atleta Válido");
      this.relacoesVisitante.push(this.inserirRelacaoVisitante);
      this.inserirCartoesVisitante(); 
      this.atualizaPlacarFinal();
      this.inicializaInserirRelacaoVisitante();
      return;
    }
    console.log("Nenhum Selecionado")
    alert("Verifique os campos de inserção e tente novamente");
  }

  onClickExcluirRelacaoVisitante(apagar: any)
  {
    console.log("Registro para remoção recebido");
    console.log(apagar);
    const obj: Relacao = this.relacoesVisitante.find(relacao => relacao.numero == apagar);
    const index: number = this.relacoesVisitante.indexOf(obj);

    if (index !== -1) 
    {
      this.relacoesVisitante.splice(index, 1);
      this.atualizaPlacarFinal();
    } 
  }

  atualizaPlacarFinal()
  {
    this.sumula.placarMandante = 0;
    this.relacoesMandante.forEach(relacao => {
    this.sumula.placarMandante += relacao.gols;
    });

    this.sumula.placarVisitante = 0;
    this.relacoesVisitante.forEach(relacao => {
      this.sumula.placarVisitante += relacao.gols;
    })
     
  }

  inicializaSumula()
  {
    this.sumula.placarMandante = 0;
    this.sumula.placarVisitante = 0;
    this.sumula.mandante = "Sem Clube";
    this.sumula.visitante = "Sem Clube";
    this.sumula.relatorioExpulsoes = "Nada a Relatar";
    this.sumula.relatorioObservacoes = "Nada a Relatar";
    this.sumula.assistente1 = "Selecionar";
    this.sumula.assistente2 = "Selecionar";

    this.inicializaInserirRelacaoMandante();
    this.inicializaInserirRelacaoVisitante();

    this.relacoesMandante = [];
    this.relacoesVisitante = [];
  }

  inicializaInserirRelacaoMandante()
  {
    this.inserirRelacaoMandante = new Relacao();
    this.inserirRelacaoMandante.nome = "Selecionar";
    this.inserirRelacaoMandante.ca = false;
    this.inserirRelacaoMandante.cvd = false;
    this.inserirRelacaoMandante.doisCa = false;
    this.inserirRelacaoMandante.gols = 0;
    this.inserirRelacaoMandante.numero = 0;
    this.inserirRelacaoMandante.titular = "Titular";
  }

  inicializaInserirRelacaoVisitante()
  {
    this.inserirRelacaoVisitante = new Relacao();
    this.inserirRelacaoVisitante.nome = "Selecionar";
    this.inserirRelacaoVisitante.ca = false;
    this.inserirRelacaoVisitante.cvd = false;
    this.inserirRelacaoVisitante.doisCa = false;
    this.inserirRelacaoVisitante.gols = 0;
    this.inserirRelacaoVisitante.numero = 0;
    this.inserirRelacaoVisitante.titular = "Titular";
  }

  getClubes()
  {
    this.clubes = this.clubeService.getClubes();
  }

  getAssistentes()
  {
    this.arbitros = this.arbitroService.getArbitrosAssistentes();
    console.log("Assistentes Recebidos")
    console.log(this.arbitros);
  }

  getAtletasByClubes()
  {
    this.atletas = this.atletaService.getAtletas();
  }

  inserirCartoesMandante()
  {
    if(!this.inserirRelacaoMandante.ca && !this.inserirRelacaoMandante.doisCa && !this.inserirRelacaoMandante.cvd)
    {
      this.inserirRelacaoMandante.cartoes = "Sem Cartão";
      return;
    }

    if((this.inserirRelacaoMandante.ca && this.inserirRelacaoMandante.doisCa && this.inserirRelacaoMandante.cvd)
    ||
    (this.inserirRelacaoMandante.ca && !this.inserirRelacaoMandante.doisCa && this.inserirRelacaoMandante.cvd))
    {
      this.inserirRelacaoMandante.cartoes = "CA + CVD";
      return;
    }

    if(this.inserirRelacaoMandante.ca && !this.inserirRelacaoMandante.doisCa && !this.inserirRelacaoMandante.cvd)
    {
      this.inserirRelacaoMandante.cartoes = "CA";
      return;
    }

    if((this.inserirRelacaoMandante.ca && this.inserirRelacaoMandante.doisCa && !this.inserirRelacaoMandante.cvd)
    ||
    (!this.inserirRelacaoMandante.ca && this.inserirRelacaoMandante.doisCa && !this.inserirRelacaoMandante.cvd))
    {
      this.inserirRelacaoMandante.cartoes = "2CA";
      return;
    }

    if((!this.inserirRelacaoMandante.ca && !this.inserirRelacaoMandante.doisCa && this.inserirRelacaoMandante.cvd)    
    ||
    (!this.inserirRelacaoMandante.ca && this.inserirRelacaoMandante.doisCa && this.inserirRelacaoMandante.cvd))
    {
      this.inserirRelacaoMandante.cartoes = "CVD";
      return;
    }
  }

  inserirCartoesVisitante()
  {
    if(!this.inserirRelacaoVisitante.ca && !this.inserirRelacaoVisitante.doisCa && !this.inserirRelacaoVisitante.cvd)
    {
      this.inserirRelacaoVisitante.cartoes = "Sem Cartão";
      return;
    }

    if((this.inserirRelacaoVisitante.ca && this.inserirRelacaoVisitante.doisCa && this.inserirRelacaoVisitante.cvd)
    ||
    (this.inserirRelacaoVisitante.ca && !this.inserirRelacaoVisitante.doisCa && this.inserirRelacaoVisitante.cvd))
    {
      this.inserirRelacaoVisitante.cartoes = "CA + CVD";
      return;
    }

    if(this.inserirRelacaoVisitante.ca && !this.inserirRelacaoVisitante.doisCa && !this.inserirRelacaoVisitante.cvd)
    {
      this.inserirRelacaoVisitante.cartoes = "CA";
      return;
    }

    if((this.inserirRelacaoVisitante.ca && this.inserirRelacaoVisitante.doisCa && !this.inserirRelacaoVisitante.cvd)
    ||
    (!this.inserirRelacaoVisitante.ca && this.inserirRelacaoVisitante.doisCa && !this.inserirRelacaoVisitante.cvd))
    {
      this.inserirRelacaoVisitante.cartoes = "2CA";
      return;
    }

    if(!this.inserirRelacaoVisitante.ca && !this.inserirRelacaoVisitante.doisCa && this.inserirRelacaoVisitante.cvd)
    {  
      this.inserirRelacaoVisitante.cartoes = "CVD";
      return;
    }

  }

}
