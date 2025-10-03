import { Inject, Injectable } from '@nestjs/common';
import * as mariadb from 'mariadb';
import { CreateTipoServicioDto } from './dto/create-tipo-servicio.dto';
import { UpdateTipoServicioDto } from './dto/update-tipo-servicio.dto';
import { QueryTipoServicioDto } from './dto/query-tipo-servicio.dto';
import { MariaDbService } from 'src/database/mariadb/mariadb.service';

@Injectable()
export class TipoServicioRepository {
    constructor(
        @Inject('leroy_db') private readonly leroy_db: mariadb.Pool,
        private readonly db: MariaDbService,
    ) { }

    async createTipoServicio(createTipoServicioDto: CreateTipoServicioDto) {
        const { nombre, id_sede, activo } = createTipoServicioDto;
        const insertId = await this.db.insert(
            this.leroy_db,
            'INSERT INTO tipos_servicios (nombre, id_sede, activo) VALUES (?, ?, ?)',
            [nombre, id_sede, activo]
        );
        return { id: insertId, nombre, id_sede, activo };
    }

    async findAllTipoServicio(query: QueryTipoServicioDto) {
        return await this.db.query(
            this.leroy_db,
            'SELECT id, nombre, id_sede, activo FROM tipos_servicios WHERE deleted_at IS NULL'
        );
    }

    async findOneTipoServicio(id: number) {
        const result = await this.db.query(
            this.leroy_db,
            'SELECT id, nombre, id_sede, activo FROM tipos_servicios WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        return result?.[0] ?? null;
    }

    async updateTipoServicio(id: number, updateTipoServicioDto: UpdateTipoServicioDto) {
        const { nombre, id_sede, activo } = updateTipoServicioDto;
        await this.db.update(
            this.leroy_db,
            'UPDATE tipos_servicios SET nombre = ?, id_sede = ?, activo = ? WHERE id = ?',
            [nombre, id_sede, activo, id]
        );
        return { id, nombre, id_sede, activo };
    }

    async removeTipoServicio(id: number) {
        await this.db.update(
            this.leroy_db,
            'UPDATE tipos_servicios SET deleted_at = NOW() WHERE id = ?',
            [id]
        );
        return { id };
    }
}
