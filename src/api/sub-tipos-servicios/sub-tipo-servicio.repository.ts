import { Inject, Injectable } from '@nestjs/common';
import * as mariadb from 'mariadb';
import { CreateSubTipoServicioDto } from './dto/create-sub-tipo-servicio.dto';
import { UpdateSubTipoServicioDto } from './dto/update-sub-tipo-servicio.dto';
import { QuerySubTipoServicioDto } from './dto/query-sub-tipo-servicio.dto';
import { MariaDbService } from 'src/database/mariadb/mariadb.service';

@Injectable()
export class SubTipoServicioRepository {
    constructor(
        @Inject('leroy_db') private readonly leroy_db: mariadb.Pool,
        private readonly db: MariaDbService,
    ) { }

    async createSubTipoServicio(createSubTipoServicioDto: CreateSubTipoServicioDto) {
        const { nombre } = createSubTipoServicioDto;
        const insertId = await this.db.insert(
            this.leroy_db,
            'INSERT INTO sub_tipos_servicios (nombre) VALUES (?)',
            [nombre]
        );
        return { id: insertId, nombre };
    }

    async findAllSubTipoServicio(query: QuerySubTipoServicioDto) {
        return await this.db.query(
            this.leroy_db,
            'SELECT id, nombre FROM sub_tipos_servicios WHERE deleted_at IS NULL'
        );
    }

    async findOneSubTipoServicio(id: number) {
        const result = await this.db.query(
            this.leroy_db,
            'SELECT id, nombre FROM sub_tipos_servicios WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        return result?.[0] ?? null;
    }

    async updateSubTipoServicio(id: number, updateSubTipoServicioDto: UpdateSubTipoServicioDto) {
        const { nombre } = updateSubTipoServicioDto;
        await this.db.update(
            this.leroy_db,
            'UPDATE sub_tipos_servicios SET nombre = ? WHERE id = ?',
            [nombre, id]
        );
        return { id, nombre };
    }

    async removeSubTipoServicio(id: number) {
        await this.db.update(
            this.leroy_db,
            'UPDATE sub_tipos_servicios SET deleted_at = NOW() WHERE id = ?',
            [id]
        );
        return { id };
    }
}
