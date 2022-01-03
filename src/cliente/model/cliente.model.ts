import { Saldo } from './saldo.model';
import { Transacao } from './transacao.model';

export class Cliente{
    private nome: String
    private telefone: String
    public saldo: Saldo
    public transacao: Transacao[]
 
    constructor( public _nome: String,  public _telefone: String,  public _saldo: Saldo, public _transacao: Transacao[]) {

        this.nome = _nome
        this.telefone = _telefone
        this.saldo = _saldo
        this.transacao = _transacao
    }

}