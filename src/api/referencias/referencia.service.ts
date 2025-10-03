import { Injectable } from '@nestjs/common';
import { ReferenciaRepository } from './referencia.repository';
import { CreateReferenciaDto } from './dto/create-referencia.dto';
import { UpdateReferenciaDto } from './dto/update-referencia.dto';
import { QueryReferenciaDto } from './dto/query-referencia.dto';

@Injectable()
export class ReferenciaService {
    constructor(private readonly referenciaRepository: ReferenciaRepository) { }

    async createReferencia(createReferenciaDto: CreateReferenciaDto) {
        return await this.referenciaRepository.createReferencia(createReferenciaDto);
    }

    async findAllReferencia(query: QueryReferenciaDto) {
        return await this.referenciaRepository.findAllReferencia(query);
    }

    async findOneReferencia(id: number) {
        return await this.referenciaRepository.findOneReferencia(id);
    }

    async updateReferencia(id: number, updateReferenciaDto: UpdateReferenciaDto) {
        return await this.referenciaRepository.updateReferencia(id, updateReferenciaDto);
    }

    async removeReferencia(id: number) {
        return await this.referenciaRepository.removeReferencia(id);
    }
}
