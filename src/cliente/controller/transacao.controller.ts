import { Controller, Post, Get, Body, Param, UseInterceptors, HttpStatus, HttpException, Put, Patch, Delete, ParseIntPipe, Logger } from '@nestjs/common';
import { ClienteService } from 'src/cliente/service/cliente.service';
import { Transacao } from '../model/transacao.model';

@Controller('/transacao/')
export class TransacaoController {
    constructor(private readonly clienteService: ClienteService) { }

    @Post(':id')
    async create( @Param('id') id, @Body() trasacao: Transacao) {
        await this.clienteService.createMyTransaction(id,trasacao);
    }
    
}

