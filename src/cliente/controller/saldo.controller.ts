import { Controller, Post, Get, Body, Param, UseInterceptors, HttpStatus, HttpException, Put, Patch, Delete, ParseIntPipe, Logger } from '@nestjs/common';
import { Cliente } from 'src/cliente/model/cliente.model';
import { ClienteService } from 'src/cliente/service/cliente.service';

@Controller('/saldo')
export class SaldoController {
    constructor(private readonly clienteService: ClienteService) { }

    @Get(':id')
    async pegaSaldo( @Param('id') id) {
        try{
            Logger.log('[1]mostra o id: ' + id)
            const cliente = await this.clienteService.getMySaldo(id);
            return cliente;
        }catch (error) {
            throw new HttpException('Não foi possível buscar seu Saldo', HttpStatus.BAD_REQUEST);
        }
    }

}

