import { Controller, Post, Get, Body, Param, UseInterceptors, HttpStatus, HttpException, Put, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { Cliente } from 'src/cliente/model/cliente.model';
import { ClienteService } from 'src/cliente/service/cliente.service';

@Controller('/cliente')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    @Post()
    async create(@Body() cliente: Cliente) {
        return await this.clienteService.create(cliente);
    }

    @Get(':id')
    async findOne( @Param('id') id: String ) {
      return await this.clienteService.findOne(id);
    }

    @Get()
    async findAll() {
      return this.clienteService.findAll();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUser: Cliente) {
      return this.clienteService.update(id, updateUser);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.clienteService.remove(id);
    }
}

