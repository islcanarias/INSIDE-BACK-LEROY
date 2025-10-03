import { Injectable } from '@nestjs/common';
import { PermisoRepository } from './permiso.repository';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { QueryPermisoDto } from './dto/query-permiso.dto';

@Injectable()
export class PermisoService {
    constructor(private readonly permisoRepository: PermisoRepository) { }

    async createPermiso(createPermisoDto: CreatePermisoDto) {
        return await this.permisoRepository.createPermiso(createPermisoDto);
    }

    async findAllPermiso(query: QueryPermisoDto) {
        return await this.permisoRepository.findAllPermiso(query);
    }

    async findOnePermiso(id: number) {
        return await this.permisoRepository.findOnePermiso(id);
    }

    async updatePermiso(id: number, updatePermisoDto: UpdatePermisoDto) {
        return await this.permisoRepository.updatePermiso(id, updatePermisoDto);
    }

    async removePermiso(id: number) {
        return await this.permisoRepository.removePermiso(id);
    }
}
