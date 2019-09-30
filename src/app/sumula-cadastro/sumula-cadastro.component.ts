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
import { HeaderComponent } from '../header/header.component';
import { LoginService } from '../login/login.service';
import { Substituicao } from '../sumula/substituicao';


@Component({
  selector: 'app-sumula-cadastro',
  templateUrl: './sumula-cadastro.component.html',
  styleUrls: ['./sumula-cadastro.component.css']
})
export class SumulaCadastroComponent implements OnInit {
  sumula: Sumula = new Sumula();
  clubes: Clube[] = [];
  arbitros: Arbitro[] = [];
  atletasMandante: Atleta[] = [];
  atletasVisitante: Atleta[] = [];

  escalacaoMandante: Escalacao = new Escalacao();
  escalacaoVisitante: Escalacao = new Escalacao();
  relacoesMandante: Relacao[] = [];
  relacoesVisitante: Relacao[] = [];
  inserirRelacaoMandante: Relacao = new Relacao();
  inserirRelacaoVisitante: Relacao = new Relacao();

  inserirSubstituicaoMandante: Substituicao = new Substituicao();
  inserirSubstituicaoVisitante: Substituicao = new Substituicao();

  constructor(private router: Router, private clubeService: ClubeService,
    private arbitroService: ArbitroService, private atletaService: AtletaService,
    private sumulaService: SumulaService, private header: HeaderComponent,
    private loginService: LoginService) { }

/*==============================================================================
NG ON INIT
==============================================================================*/
  ngOnInit() 
  {
    this.getAssistentes(); //Busca opções de assistentes
    this.getClubes(); //Busca opções de clubes
    //this.getAtletasByClubes(); //Busca atletas por clubes (depois deverá ser removido)
    this.inicializaSumula(); //Inicializa variáveis da súmula
  }
/*==============================================================================
ON SUBIMIT
==============================================================================*/
  onSubmit(formulario: NgForm)
  {
    if(formulario.valid)
    {
      if(!this.validaSumula())
      {
        alert("Há campos com erros");
        return;
      }
      //Guarda nome do clube mandante
      this.sumula.mandante = this.clubes.find(
        clube => clube.id == this.sumula.idMandante).nome;    

      //Guarda nome do clube visitante
      this.sumula.visitante = this.clubes.find(
        clube => clube.id == this.sumula.idVisitante).nome;  
      
      //Guarda nome do assistente1 por id
      this.sumula.assistente1 = this.arbitros.find(
        arbitro => arbitro.id == this.sumula.idAssistente1).nome; 
      
      //Guarda nome do assistente2 por id
      this.sumula.assistente2 = this.arbitros.find(
        arbitro => arbitro.id == this.sumula.idAssistente2).nome; 
      
      //Monta a escalação completa com todas as relações
      this.escalacaoMandante.relacoes = this.relacoesMandante; 
      this.escalacaoVisitante.relacoes = this.relacoesVisitante;
      
      //Guarda tudo na classe final
      this.sumula.escalacaoMandante = this.escalacaoMandante; 
      this.sumula.escalacaoVisitante = this.escalacaoVisitante;

      console.log("recebido no Submit");
      console.log(this.sumula);

      this.sumulaService.cadastraSumula(this.sumula); //Salva a súmula
      this.sumula = new Sumula(); //Reinicializa 
      this.inicializaSumula(); //Inicia a sumula

      this.router.navigate(['/sumula']); //Volta para a página inicial de súmulas
    }
  }
/*==============================================================================
TROCA O CLUBE MANDANTE
==============================================================================*/
  changeClubeMandante(idMandante: NgModel)
  {
    console.log("Trocando Local da Partida");
    console.log(idMandante.value);
    //Busca nome do estádio
    if(this.sumula.idMandante != "null")
    {
      this.sumula.estadio = this.clubes.find(clube => clube.id == idMandante.value).estadio; 
    }
    else 
    {
      this.sumula.estadio = "";
    }
    //Falta Buscar cidade (após a implementação do CEP service)

    this.getAtletasByClubes(); //Busca os atletas da equipe mandante
    this.inicializaInserirRelacaoMandante(); //Reinicia todos os atletas mandantes
    this.relacoesMandante = []; //Apaga Lista de Atletas
  }
/*==============================================================================
TROCA O CLUBE VISITANTE
==============================================================================*/
  changeClubeVisitante(idVisitante: NgModel)
  {
    console.log("Trocando Local da Partida");
    console.log(idVisitante.value);

    this.getAtletasByClubes(); //Busca os atletas da equipe visitante
    this.inicializaInserirRelacaoVisitante(); //Reinicia todos os atletas visitantes
    this.relacoesVisitante = []; //Apaga Lista de Atletas
  }
/*==============================================================================
ON CLICK - INSERIR ATLETA CLUBE MANDANTE
==============================================================================*/
  onClickInserirRelacaoMandante()
  {
    //Cria um objeto Relação para verificar se já existe um atleta com esse número
    const obj: Relacao = this.relacoesMandante.find
    (relacao => relacao.numero == this.inserirRelacaoMandante.numero);

    console.log("Id do atleta");
    console.log(this.inserirRelacaoMandante.idAtleta);

    //Prossegue com a inserção se: 
    //O Atleta for válido
    //O Número da camisa dele for maior que 0
    //Se a quantidade de gols que ele fez por maior ou igual a 0
    //E se nenhuma tleta com o mesmo número dele está inserido nessa lista
    if(this.inserirRelacaoMandante.idAtleta != "null"
    && this.inserirRelacaoMandante.numero > 0
    && this.inserirRelacaoMandante.gols >= 0
    && !obj)
    {
      //Busca o nome pelo seu id
      this.inserirRelacaoMandante.nome = this.atletasMandante.find(
        atleta => atleta.id == this.inserirRelacaoMandante.idAtleta).nome;
      
      console.log("Nome encontrado");
      console.log(this.inserirRelacaoMandante.nome);
   
      this.relacoesMandante.push(this.inserirRelacaoMandante); //Coloca na relação
      this.inserirCartoesMandante(); //Insere os cartões
      this.atualizaPlacarFinal(); //Atualiza o placar
      this.inicializaInserirRelacaoMandante(); //Reinicia os valores para inserção de atleta
      return;
    }
    console.log("Nenhum Selecionado")
    alert("Verifique os campos de inserção e tente novamente"); //Informa o erro
  }
/*==============================================================================
ON CLICK - EXCLUIR ATLETA DA EQUIPE MANDANTE
==============================================================================*/
  onClickExcluirRelacaoMandante(apagar: any)
  {
    console.log("Registro para remoção recebido");
    console.log(apagar);

    //Busca o atleta que será apagado da relação com base no número da camisa
    const obj: Relacao = this.relacoesMandante.find(relacao => relacao.numero == apagar);
    //Busca a posição na array
    const index: number = this.relacoesMandante.indexOf(obj);

    //Foi encontrado
    if (index !== -1) 
    {
      this.relacoesMandante.splice(index, 1); //Apaga
      this.atualizaPlacarFinal(); //Atualiza o placar final
    } 
  }
/*==============================================================================
ON CLICK - INSERIR ATLETA EQUIPE VISITANTE
==============================================================================*/
  onClickInserirRelacaoVisitante()
  {
    //Cria um objeto Relação para verificar se já existe um atleta com esse número
    const obj: Relacao = this.relacoesVisitante.find
    (relacao => relacao.numero == this.inserirRelacaoVisitante.numero );

    //Prossegue com a inserção se: 
    //O Atleta for válido
    //O Número da camisa dele for maior que 0
    //Se a quantidade de gols que ele fez por maior ou igual a 0
    //E se nenhuma tleta com o mesmo número dele está inserido nessa lista
    if(this.inserirRelacaoVisitante.idAtleta != "null"
    && this.inserirRelacaoVisitante.numero > 0
    && this.inserirRelacaoVisitante.gols >= 0
    && !obj)
    {
      console.log("Atleta Válido");

      //Busca o nome pelo seu id
      this.inserirRelacaoVisitante.nome = this.atletasVisitante.find(
        atleta => atleta.id == this.inserirRelacaoVisitante.idAtleta).nome;

      this.relacoesVisitante.push(this.inserirRelacaoVisitante); //Remove da lista
      this.inserirCartoesVisitante();  //Insere os cartões
      this.atualizaPlacarFinal(); //Atualiza placar final
      this.inicializaInserirRelacaoVisitante(); //Reinicia as variáveis de inserção
      return;
    }
    console.log("Nenhum Selecionado")
    alert("Verifique os campos de inserção e tente novamente");
  }
/*==============================================================================
ON CLICK - EXCLUIR ATLETA EQUIPE VISITANTE
==============================================================================*/
  onClickExcluirRelacaoVisitante(apagar: any)
  {
    console.log("Registro para remoção recebido");
    console.log(apagar);

    //Busca o atleta pelo número da camisa
    const obj: Relacao = this.relacoesVisitante.find(relacao => relacao.numero == apagar);
    //Busca a sua posição na array
    const index: number = this.relacoesVisitante.indexOf(obj);

    //Posição válida
    if (index !== -1) 
    {
      this.relacoesVisitante.splice(index, 1); //Remove
      this.atualizaPlacarFinal(); //Atualiza placar final
    } 
  }
/*==============================================================================
ON CLICK - INSERIR SUBSTITUIÇÃO MANDANTE
==============================================================================*/
  onClickInserirSubstituicaoMandante()
  {
    const verificaEntrou: Substituicao = this.sumula.substituicoesMandante.find
    (sub => sub.entra == this.inserirSubstituicaoMandante.entra);
    const verificaSaiu: Substituicao = this.sumula.substituicoesMandante.find
    (sub => sub.sai == this.inserirSubstituicaoMandante.sai);

    console.log("Substituicao recebida");
    console.log(this.inserirSubstituicaoMandante);

    if(this.inserirSubstituicaoMandante.entra >= 1 &&
      this.inserirSubstituicaoMandante.sai >= 1 &&
      this.inserirSubstituicaoMandante.tempo >= 1 &&
      this.inserirSubstituicaoMandante.periodo != null &&
      this.inserirSubstituicaoMandante.entra != this.inserirSubstituicaoMandante.sai &&
      !verificaEntrou && !verificaSaiu)
    {
      this.inserirSubstituicaoMandante.equipeMandante = true;
      this.sumula.substituicoesMandante.push(this.inserirSubstituicaoMandante);
      
      console.log("Subs Mandante Atualizado");
      console.log(this.sumula.substituicoesMandante);

      this.inicializaInserirSubstituicaoMandante();
      return;
    }
    console.log("Erro nas substituição")
    alert("Verifique os campos de inserção e tente novamente"); //Informa o erro
  }
/*==============================================================================
ON CLICK - EXCLUIR ATLETA DA EQUIPE MANDANTE
==============================================================================*/
  onClickExcluirSubstituicaoMandante(numero: any)
  {
    const excluirSubstituicao: Substituicao = 
      this.sumula.substituicoesMandante.find(subs => subs.entra == numero);
    const index: number = this.sumula.substituicoesMandante.indexOf(excluirSubstituicao);

    if(index >= 0)
    {
      this.sumula.substituicoesMandante.splice(index, 1);
    }
  }
/*==============================================================================
ON CLICK - INSERIR SUBSTITUIÇÃO VISITANTE
==============================================================================*/
  onClickInserirSubstituicaoVisitante()
  {
    const verificaEntrou: Substituicao = this.sumula.substituicoesVisitante.find
    (sub => sub.entra == this.inserirSubstituicaoVisitante.entra);
    const verificaSaiu: Substituicao = this.sumula.substituicoesVisitante.find
    (sub => sub.sai == this.inserirSubstituicaoVisitante.sai);

    console.log("Substituicao recebida");
    console.log(this.inserirSubstituicaoVisitante);

    if(this.inserirSubstituicaoVisitante.entra >= 1 &&
      this.inserirSubstituicaoVisitante.sai >= 1 &&
      this.inserirSubstituicaoVisitante.tempo >= 1 &&
      this.inserirSubstituicaoVisitante.periodo != null &&
      this.inserirSubstituicaoVisitante.entra != this.inserirSubstituicaoVisitante.sai &&
      !verificaEntrou && !verificaSaiu)
    {
      this.inserirSubstituicaoVisitante.equipeMandante = false;
      this.sumula.substituicoesVisitante.push(this.inserirSubstituicaoVisitante);
      
      console.log("Subs Visitante Atualizado");
      console.log(this.sumula.substituicoesVisitante);

      this.inicializaInserirSubstituicaoVisitante();
      return;
    }
    console.log("Erro nas substituição")
    alert("Verifique os campos de inserção e tente novamente"); //Informa o erro
  }
/*==============================================================================
ON CLICK - EXCLUIR ATLETA DA EQUIPE VISITANTE
==============================================================================*/
  onClickExcluirSubstituicaoVisitante(numero: any)
  {
    const excluirSubstituicao: Substituicao = 
      this.sumula.substituicoesVisitante.find(subs => subs.entra == numero);
    const index: number = this.sumula.substituicoesVisitante.indexOf(excluirSubstituicao);

    if(index >= 0)
    {
      this.sumula.substituicoesVisitante.splice(index, 1);
    }
  } 
/*==============================================================================
ATUALIZA PLACAR FINAL
==============================================================================*/
  atualizaPlacarFinal()
  {
    this.sumula.placarMandante = 0; //Zera
    //Para cada atleta na relação incrementa a variável final
    this.relacoesMandante.forEach(relacao => { 
    this.sumula.placarMandante += relacao.gols;
    });

    this.sumula.placarVisitante = 0; //Zera
    //Para cada atleta na relação incrementa a variável final
    this.relacoesVisitante.forEach(relacao => {
      this.sumula.placarVisitante += relacao.gols;
    })
     
  }
/*==============================================================================
INICIA SÚMULA
==============================================================================*/
  inicializaSumula()
  {
    //const arbitroLogado: Arbitro = this.header.getArbitroLogado();
    const arbitroLogado: Arbitro = this.loginService.getArbitroLogado();

    this.sumula.placarMandante = 0; //Placar
    this.sumula.placarVisitante = 0;

    this.sumula.mandante = "Sem Clube"; //Equipes
    this.sumula.visitante = "Sem Clube";
    this.sumula.idMandante = "null";
    this.sumula.idVisitante = "null";

    this.sumula.relatorioExpulsoes = "Nada a Relatar"; //Relatórios
    this.sumula.relatorioObservacoes = "Nada a Relatar";

    this.sumula.idArbitro = arbitroLogado.id; //Arbitragem
    this.sumula.arbitro = arbitroLogado.nome;
    this.sumula.assistente1 = "Selecionar"; 
    this.sumula.assistente2 = "Selecionar";   
    this.sumula.idAssistente1 = "null";
    this.sumula.idAssistente2 = "null";

    this.inicializaInserirRelacaoMandante(); //Inserção de atletas
    this.inicializaInserirRelacaoVisitante();

    this.relacoesMandante = []; //Listas de atletas
    this.relacoesVisitante = [];

    this.inicializaInserirSubstituicaoMandante();
    this.inicializaInserirSubstituicaoVisitante();

    this.sumula.substituicoesMandante = [];
    this.sumula.substituicoesVisitante = [];
  }
/*==============================================================================
INICIALIZA NOVO ATLETA MANDANTE
==============================================================================*/
  inicializaInserirRelacaoMandante()
  {
    this.inserirRelacaoMandante = new Relacao(); //Inicializa classe
    this.inserirRelacaoMandante.nome = "Selecionar"; //Inicializa variáveis de inserção
    this.inserirRelacaoMandante.ca = false;
    this.inserirRelacaoMandante.cvd = false;
    this.inserirRelacaoMandante.doisCa = false;
    this.inserirRelacaoMandante.gols = 0;
    this.inserirRelacaoMandante.numero = 0;
    this.inserirRelacaoMandante.titular = "Titular";
    this.inserirRelacaoMandante.idAtleta = "null";
  }
/*==============================================================================
INICIALIZA NOVO ATLETA VISITANTE
==============================================================================*/
  inicializaInserirRelacaoVisitante()
  {
    this.inserirRelacaoVisitante = new Relacao(); //Inicializa Classe
    this.inserirRelacaoVisitante.nome = "Selecionar"; //Inicializa variáveis de inserção
    this.inserirRelacaoVisitante.ca = false;
    this.inserirRelacaoVisitante.cvd = false;
    this.inserirRelacaoVisitante.doisCa = false;
    this.inserirRelacaoVisitante.gols = 0;
    this.inserirRelacaoVisitante.numero = 0;
    this.inserirRelacaoVisitante.titular = "Titular";
    this.inserirRelacaoVisitante.idAtleta = "null";
  }
/*==============================================================================
INICIALIZA NOVA SUBSTITUIÇÃO MANDANTE
==============================================================================*/
  inicializaInserirSubstituicaoMandante()
  {
    this.inserirSubstituicaoMandante = new Substituicao(); //Inicializa classe
    this.inserirSubstituicaoMandante.entra = 0; //Inicializa variáveis de inserção
    this.inserirSubstituicaoMandante.equipeMandante = false;
    this.inserirSubstituicaoMandante.periodo = "1T";
    this.inserirSubstituicaoMandante.sai = 0;
    this.inserirSubstituicaoMandante.tempo = 0;
  }
/*==============================================================================
INICIALIZA NOVA SUBSTITUIÇÃO VISITANTE
==============================================================================*/
  inicializaInserirSubstituicaoVisitante()
  {
    this.inserirSubstituicaoVisitante = new Substituicao(); //Inicializa classe
    this.inserirSubstituicaoVisitante.entra = 0; //Inicializa variáveis de inserção
    this.inserirSubstituicaoVisitante.equipeMandante = false;
    this.inserirSubstituicaoVisitante.periodo = "1T";
    this.inserirSubstituicaoVisitante.sai = 0;
    this.inserirSubstituicaoVisitante.tempo = 0;
  }
/*==============================================================================
BUSCA OS CLUBES
==============================================================================*/
  getClubes()
  {
    this.clubes = this.clubeService.getClubes(); //Busca todos os clubes
  }
/*==============================================================================
BUSCA OS ASSISTENTES
==============================================================================*/
  getAssistentes()
  {
    this.arbitros = this.arbitroService.getArbitrosAssistentes(); //Busca somentes os assistentes
    console.log("Assistentes Recebidos")
    console.log(this.arbitros);
  }
/*==============================================================================
BUSCA OS ATLETAS PELO CLUBE (FALTA IMPLEMENTAR)
==============================================================================*/
  getAtletasByClubes()
  {
    //this.atletasMandante = this.atletaService.getAtletas(); //Busca todos os atletas
    //this.atletasVisitante = this.atletaService.getAtletas();
    //Futuramente deverá filtrar por clube escolhido

    //Busca os atletas filtrando por equipe
    this.atletasMandante = this.atletaService.getAtletasByClube(this.sumula.idMandante);
    this.atletasVisitante = this.atletaService.getAtletasByClube(this.sumula.idVisitante);  
  }
/*==============================================================================
INSERE CARTÕES NA EQUIPE MANDANTE
==============================================================================*/
  inserirCartoesMandante()
  {
    //Insere um texto com base nos boleanos de cartões, considera todas as possibilidades
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
/*==============================================================================
INSERE CARTÕES NA EQUIPE VISITANTE
==============================================================================*/
  inserirCartoesVisitante()
  {
    //Insere um texto com base nos boleanos de cartões, considera todas as possibilidades
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
/*==============================================================================
VALIDA SÚMULA
==============================================================================*/
  validaSumula()
  {
    if(this.sumula.idMandante == "null") return false;
    if(this.sumula.idVisitante == "null") return false;
    if(this.sumula.idAssistente1 == "null") return false;
    if(this.sumula.idAssistente2 == "null") return false;

    return true;
  }
}
