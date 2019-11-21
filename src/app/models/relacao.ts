import { Atleta } from './atleta';

export class Relacao
{
    id: Number;
    idAtleta: String;
    nome: String;
    numero: number;
    gol: any;
    titular: String;
    ca: Boolean;
    doisCa: Boolean;
    cvd: Boolean;
    cartoes: String;

    escalacao: String;
    atleta: Atleta;
}