import { Injectable } from '@nestjs/common';
import { TipoServicioRepository } from './tipo-servicio.repository';
import { CreateTipoServicioDto } from './dto/create-tipo-servicio.dto';
import { UpdateTipoServicioDto } from './dto/update-tipo-servicio.dto';
import { QueryTipoServicioDto } from './dto/query-tipo-servicio.dto';

@Injectable()
export class TipoServicioService {
    constructor(private readonly tipoServicioRepository: TipoServicioRepository) { }

    async createTipoServicio(createTipoServicioDto: CreateTipoServicioDto) {
        return await this.tipoServicioRepository.createTipoServicio(createTipoServicioDto);
    }

    async findAllTipoServicio(query: QueryTipoServicioDto) {
        return await this.tipoServicioRepository.findAllTipoServicio(query);
    }

    async findOneTipoServicio(id: number) {
        return await this.tipoServicioRepository.findOneTipoServicio(id);
    }

    async updateTipoServicio(id: number, updateTipoServicioDto: UpdateTipoServicioDto) {
        return await this.tipoServicioRepository.updateTipoServicio(id, updateTipoServicioDto);
    }

    async removeTipoServicio(id: number) {
        return await this.tipoServicioRepository.removeTipoServicio(id);
    }
}
