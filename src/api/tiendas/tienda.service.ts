import { Injectable } from '@nestjs/common';
import { TiendaRepository } from './tienda.repository';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { UpdateTiendaDto } from './dto/update-tienda.dto';
import { QueryTiendaDto } from './dto/query-tienda.dto';

@Injectable()
export class TiendaService {
    constructor(private readonly tiendaRepository: TiendaRepository) { }

    async createTienda(createTiendaDto: CreateTiendaDto) {
        return await this.tiendaRepository.createTienda(createTiendaDto);
    }

    async findAllTienda(query: QueryTiendaDto) {
        return await this.tiendaRepository.findAllTienda(query);
    }

    async findOneTienda(id: number) {
        return await this.tiendaRepository.findOneTienda(id);
    }

    async updateTienda(id: number, updateTiendaDto: UpdateTiendaDto) {
        return await this.tiendaRepository.updateTienda(id, updateTiendaDto);
    }

    async removeTienda(id: number) {
        return await this.tiendaRepository.removeTienda(id);
    }
}
