import { Injectable } from '@nestjs/common';
import { SubsedeRepository } from './subsede.repository';
import { CreateSubsedeDto } from './dto/create-subsede.dto';
import { UpdateSubsedeDto } from './dto/update-subsede.dto';
import { QuerySubsedeDto } from './dto/query-subsede.dto';

@Injectable()
export class SubsedeService {
    constructor(private readonly subsedeRepository: SubsedeRepository) { }

    async createSubsede(createSubsedeDto: CreateSubsedeDto) {
        return await this.subsedeRepository.createSubsede(createSubsedeDto);
    }

    async findAllSubsede(query: QuerySubsedeDto) {
        return await this.subsedeRepository.findAllSubsede(query);
    }

    async findOneSubsede(id: number) {
        return await this.subsedeRepository.findOneSubsede(id);
    }

    async updateSubsede(id: number, updateSubsedeDto: UpdateSubsedeDto) {
        return await this.subsedeRepository.updateSubsede(id, updateSubsedeDto);
    }

    async removeSubsede(id: number) {
        return await this.subsedeRepository.removeSubsede(id);
    }
}
