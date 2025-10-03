import { Injectable } from '@nestjs/common';
import { PedidoRepository } from './pedido.repository';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { QueryPedidoDto } from './dto/query-pedido.dto';

@Injectable()
export class PedidoService {
    constructor(private readonly pedidoRepository: PedidoRepository) { }

    async createPedido(createPedidoDto: CreatePedidoDto) {
        return await this.pedidoRepository.createPedido(createPedidoDto);
    }

    async findAllPedido(query: QueryPedidoDto) {
        return await this.pedidoRepository.findAllPedido(query);
    }

    async findOnePedido(id: number) {
        return await this.pedidoRepository.findOnePedido(id);
    }

    async updatePedido(id: number, updatePedidoDto: UpdatePedidoDto) {
        return await this.pedidoRepository.updatePedido(id, updatePedidoDto);
    }

    async removePedido(id: number) {
        return await this.pedidoRepository.removePedido(id);
    }
}
