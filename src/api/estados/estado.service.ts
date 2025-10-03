import { Injectable } from '@nestjs/common';
import { EstadoRepository } from './estado.repository';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { QueryEstadoDto } from './dto/query-estado.dto';

@Injectable()
export class EstadoService {
    constructor(private readonly estadoRepository: EstadoRepository) { }

    async createEstado(createEstadoDto: CreateEstadoDto) {
        return await this.estadoRepository.createEstado(createEstadoDto);
    }

    async findAllEstado(query: QueryEstadoDto) {
        return await this.estadoRepository.findAllEstado(query);
    }

    async findOneEstado(id: number) {
        return await this.estadoRepository.findOneEstado(id);
    }

    async updateEstado(id: number, updateEstadoDto: UpdateEstadoDto) {
        return await this.estadoRepository.updateEstado(id, updateEstadoDto);
    }

    async removeEstado(id: number) {
        return await this.estadoRepository.removeEstado(id);
    }
}
