import { Injectable } from '@nestjs/common';
import { SeccionRepository } from './seccion.repository';
import { CreateSeccionDto } from './dto/create-seccion.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';
import { QuerySeccionDto } from './dto/query-seccion.dto';

@Injectable()
export class SeccionService {
    constructor(private readonly seccionRepository: SeccionRepository) { }

    async createSeccion(createSeccionDto: CreateSeccionDto) {
        return await this.seccionRepository.createSeccion(createSeccionDto);
    }

    async findAllSeccion(query: QuerySeccionDto) {
        return await this.seccionRepository.findAllSeccion(query);
    }

    async findOneSeccion(id: number) {
        return await this.seccionRepository.findOneSeccion(id);
    }

    async updateSeccion(id: number, updateSeccionDto: UpdateSeccionDto) {
        return await this.seccionRepository.updateSeccion(id, updateSeccionDto);
    }

    async removeSeccion(id: number) {
        return await this.seccionRepository.removeSeccion(id);
    }
}
