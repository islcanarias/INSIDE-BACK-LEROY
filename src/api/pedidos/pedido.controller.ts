import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { PedidoService } from "./pedido.service";
import { CreatePedidoDto } from "./dto/create-pedido.dto";
import { QueryPedidoDto } from "./dto/query-pedido.dto";
import { UpdatePedidoDto } from "./dto/update-pedido.dto";

@Controller('gestion-pedidos/pedidos')
export class PedidoController {
    constructor(private readonly pedidoService: PedidoService) { }

    @Post()
    async create(@Body() createDto: CreatePedidoDto) {
        return await this.pedidoService.createPedido(createDto);
    }

    @Get()
    async findAll(@Query() query: QueryPedidoDto) {
        return await this.pedidoService.findAllPedido(query);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.pedidoService.findOnePedido(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdatePedidoDto) {
        return await this.pedidoService.updatePedido(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.pedidoService.removePedido(id);
    }
}