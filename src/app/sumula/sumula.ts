import { Escalacao } from './escalacao';
import { Substituicao } from './substituicao';
import { Comissao } from './comissao';

export class Sumula
{
    id: String;
    mandante: String;
    visitante: String;
    idMandante: String;
    idVisitante: String;
    data: Date;
    placarMandante: any;
    placarVisitante: any;
    estadio: String;
    cidade: String;

    entradaMandante: Date;
    entradaVisitante: Date;
    retornoMandante: Date;
    retornoVisitante: Date;
    inicioPrimeiroTempo: Date;
    inicioSegundoTempo: Date;
    fimPrimeiroTempo: Date;
    fimSegundoTempo: Date;

    arbitro: String;
    assistente1: String;
    assistente2: String;
    idArbitro: String;
    idAssistente1: String;
    idAssistente2: String;

    relatorioExpulsoes: String;
    relatorioObservacoes: String;

    escalacaoMandante: Escalacao;
    escalacaoVisitante: Escalacao;

    substituicoesMandante: Substituicao[];
    substituicoesVisitante: Substituicao[];

    comissaoMandante: Comissao;
    comissaoVisitante: Comissao;

}