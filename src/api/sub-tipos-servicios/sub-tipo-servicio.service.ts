import { Injectable } from '@nestjs/common';
import { SubTipoServicioRepository } from './sub-tipo-servicio.repository';
import { CreateSubTipoServicioDto } from './dto/create-sub-tipo-servicio.dto';
import { UpdateSubTipoServicioDto } from './dto/update-sub-tipo-servicio.dto';
import { QuerySubTipoServicioDto } from './dto/query-sub-tipo-servicio.dto';

@Injectable()
export class SubTipoServicioService {
    constructor(private readonly subTipoServicioRepository: SubTipoServicioRepository) { }

    async createSubTipoServicio(createSubTipoServicioDto: CreateSubTipoServicioDto) {
        return await this.subTipoServicioRepository.createSubTipoServicio(createSubTipoServicioDto);
    }

    async findAllSubTipoServicio(query: QuerySubTipoServicioDto) {
        return await this.subTipoServicioRepository.findAllSubTipoServicio(query);
    }

    async findOneSubTipoServicio(id: number) {
        return await this.subTipoServicioRepository.findOneSubTipoServicio(id);
    }

    async updateSubTipoServicio(id: number, updateSubTipoServicioDto: UpdateSubTipoServicioDto) {
        return await this.subTipoServicioRepository.updateSubTipoServicio(id, updateSubTipoServicioDto);
    }

    async removeSubTipoServicio(id: number) {
        return await this.subTipoServicioRepository.removeSubTipoServicio(id);
    }
}
