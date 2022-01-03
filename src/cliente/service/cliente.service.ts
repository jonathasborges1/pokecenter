import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cliente } from 'src/cliente/model/cliente.model';
import { Transacao } from '../model/transacao.model';
import { Saldo } from '../model/saldo.model';
import { response } from 'express';


@Injectable()
export class ClienteService {
    constructor(@InjectModel('Cliente') private readonly modelCliente: Model<Cliente>,
                @InjectModel('Transacao')  private readonly modelTransacao: Model<Transacao>) { }

    // Cria um novo Cliente
    public async create(data: Cliente): Promise<Cliente> { 
      try {
        const cliente = new this.modelCliente(data);
        return await cliente.save();
      }catch (error) {
        throw new HttpException('Não foi possível realizar seu cadastro', HttpStatus.BAD_REQUEST);
      }
    }

    // Busca 1 Cliente pelo id
    public async findOne(id: String) {
      try {
        return await this.modelCliente.find( {"_id": id},{_id:1,saldo:1,nome:1,telefone:1} ).limit(1);
      }catch (error) {
        throw new HttpException('Não foi possível recuperar APENAS 1 cliente', HttpStatus.BAD_REQUEST);
      }
    }

    // Busca 1 Cliente pelo nome
    public async getByNome( _nome: String)  {
      return this.modelCliente.find( {nome: _nome} ).exec();
    }

    // Busca Todos os Cliente 
    public async findAll() : Promise<Cliente[]>  {
      try {
        return await this.modelCliente.find();
      }catch (error) {
        throw new HttpException('Não foi possível RECUPERAR TODOS cliente', HttpStatus.BAD_REQUEST);
      }
    }
    // Atualiza 1 Cliente 
    public async update(id: string, updateCliente: Cliente) {
      try {
        return this.modelCliente.findByIdAndUpdate( { _id: id}, {$set: updateCliente}, {new: true});
      }catch (error) {
        throw new HttpException('Não foi possível ATUALIZAR o cliente', HttpStatus.BAD_REQUEST);
      }    
    }

    // deleta 1 Cliente 
    public async remove(id: string) {
      return this.modelCliente.deleteOne({_id: id}).exec();
    }

    // Busca 1 cliente e atualiza a transacao
    public async createMyTransaction(userId: String, newTransaction: Transacao) {
      const session = await this.modelCliente.startSession();
      session.startTransaction();
      try{
        const opts = { session };
        if(newTransaction.tipo == "credito"){
          const clienteCreditado = await this.modelCliente.findOneAndUpdate( 
            { _id: userId }, { $inc: { "saldo": this.validaCredito(newTransaction.quantidade) } }, opts);
        }else{
          const clienteDebitado = await this.modelCliente.findOneAndUpdate( 
            { _id: userId }, { $inc: { "saldo": this.validaDebito(newTransaction.quantidade)  } }, opts);
            Logger.log('Logger antes da funcao validaSaldo ' + clienteDebitado.saldo );
            if(this.validaSaldo(Number(clienteDebitado.saldo)) ){ Logger.log('Logger DENTRO! da funcao validaSaldo'); throw response.status(423).json({
              message: {
                statusCode: 423,
                error: 'O recurso sendo acessado está travado. '
              },
            });}
        }

        const registraTransacao = await new this.modelTransacao(newTransaction).save(opts);

        await session.commitTransaction();
        session.endSession();
        return HttpStatus.OK;
      }catch (error) { // Se ocorrer um erro, aborte toda a transação e desfaça quaisquer alterações que possam ter acontecido
        await session.abortTransaction();
        session.endSession();
        throw error; 
      }
   }

   public async getMySaldo(id: String){
    const filter = { _id: id };
    return await this.modelCliente.find( {"_id": id},{_id:0,saldo:1} ).limit(1);
   }

   public validaDebito(numero: number){ // Aceita Apenas Valores Negativos
    if(numero > 0){
      return ( (-1) * (numero) );
    }
    return numero;
   }
   public validaCredito(numero: number){ // Aceita Apenas Valores Positivos
    if(numero < 0){
      return ( (-1) * (numero) );
    }
    return numero;
   }
   public validaSaldo(valor:number): boolean{
    if(valor < 0){
      return true;
    }
    return false;
   }
}