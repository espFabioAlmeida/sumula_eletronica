import { Escalacao } from './escalacao';
import { Substituicao } from './substituicao';
import { Comissao } from './comissao';
import { Clube } from '../clube/clube';
import { Arbitro } from '../arbitro/arbitro';
import { Cronologia } from './cronologia';

export class Sumula
{
    id: String;
    clubeMandante: Clube;
    clubeVisitante: Clube;
    data: Date;
    placarMandante: any;
    placarVisitante: any;
    local: String;

    cronologia: Cronologia;

    arbitro: Arbitro;
    assistente1: Arbitro;
    assistente2: Arbitro;

    relatorioExpulsoes: String;
    relatorioObservacoes: String;

    escalacaoMandante: Escalacao;
    escalacaoVisitante: Escalacao;

    substituicoes: Substituicao[];
    substituicoesMandante: Substituicao[];
    substituicoesVisitante: Substituicao[];

    comissaoMandante: Comissao;
    comissaoVisitante: Comissao;

}