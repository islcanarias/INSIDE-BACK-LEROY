import { Injectable } from '@nestjs/common';
import { RolRepository } from './rol.repository';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { QueryRolDto } from './dto/query-rol.dto';

@Injectable()
export class RolService {
    constructor(private readonly rolRepository: RolRepository) { }

    async createRol(createRolDto: CreateRolDto) {
        return await this.rolRepository.createRol(createRolDto);
    }

    async findAllRol(query: QueryRolDto) {
        return await this.rolRepository.findAllRol(query);
    }

    async findOneRol(id: number) {
        return await this.rolRepository.findOneRol(id);
    }

    async updateRol(id: number, updateRolDto: UpdateRolDto) {
        return await this.rolRepository.updateRol(id, updateRolDto);
    }

    async removeRol(id: number) {
        return await this.rolRepository.removeRol(id);
    }
}
