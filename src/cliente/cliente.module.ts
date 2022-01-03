import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClienteController } from './controller/cliente.controller';
import { SaldoController } from './controller/saldo.controller';
import { TransacaoController } from './controller/transacao.controller';
import { ClienteSchema } from './schema/cliente.schema';
import { TransacaoSchema } from './schema/transacao.schema';
import { ClienteService } from './service/cliente.service';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Cliente', schema: ClienteSchema}, {name:'Transacao', schema: TransacaoSchema}])],
    controllers: [ClienteController, SaldoController,TransacaoController],
    providers: [ClienteService]
})
export class ClienteModule {}
