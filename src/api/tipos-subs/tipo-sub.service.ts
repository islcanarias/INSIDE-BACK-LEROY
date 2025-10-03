import { Injectable } from '@nestjs/common';
import { TipoSubRepository } from './tipo-sub.repository';
import { CreateTipoSubDto } from './dto/create-tipo-sub.dto';
import { UpdateTipoSubDto } from './dto/update-tipo-sub.dto';
import { QueryTipoSubDto } from './dto/query-tipo-sub.dto';

@Injectable()
export class TipoSubService {
    constructor(private readonly tipoSubRepository: TipoSubRepository) { }

    async createTipoSub(createTipoSubDto: CreateTipoSubDto) {
        return await this.tipoSubRepository.createTipoSub(createTipoSubDto);
    }

    async findAllTipoSub(query: QueryTipoSubDto) {
        return await this.tipoSubRepository.findAllTipoSub(query);
    }

    async findOneTipoSub(id: number) {
        return await this.tipoSubRepository.findOneTipoSub(id);
    }

    async updateTipoSub(id: number, updateTipoSubDto: UpdateTipoSubDto) {
        return await this.tipoSubRepository.updateTipoSub(id, updateTipoSubDto);
    }

    async removeTipoSub(id: number) {
        return await this.tipoSubRepository.removeTipoSub(id);
    }
}
