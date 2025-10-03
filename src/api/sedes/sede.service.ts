import { Injectable } from '@nestjs/common';
import { SedeRepository } from './sede.repository';
import { CreateSedeDto } from './dto/create-sede.dto';
import { UpdateSedeDto } from './dto/update-sede.dto';
import { QuerySedeDto } from './dto/query-sede.dto';

@Injectable()
export class SedeService {
    constructor(private readonly sedeRepository: SedeRepository) { }

    async createSede(createSedeDto: CreateSedeDto) {
        return await this.sedeRepository.createSede(createSedeDto);
    }

    async findAllSede(query: QuerySedeDto) {
        return await this.sedeRepository.findAllSede(query);
    }

    async findOneSede(id: number) {
        return await this.sedeRepository.findOneSede(id);
    }

    async updateSede(id: number, updateSedeDto: UpdateSedeDto) {
        return await this.sedeRepository.updateSede(id, updateSedeDto);
    }

    async removeSede(id: number) {
        return await this.sedeRepository.removeSede(id);
    }
}
