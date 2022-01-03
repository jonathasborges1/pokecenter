export enum Tipagem{
    debito,
    credito
}
export class Transacao{
    public quantidade = 0;
    public tipo;
    constructor( public _quantidade: number, public _tipo: Tipagem) {
        this.quantidade = _quantidade;
        this.tipo = _tipo;
    }
}