import { Inject, Injectable } from '@nestjs/common';
import * as mariadb from 'mariadb';
import { CreateSeccionDto } from './dto/create-seccion.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';
import { QuerySeccionDto } from './dto/query-seccion.dto';
import { MariaDbService } from 'src/database/mariadb/mariadb.service';

@Injectable()
export class SeccionRepository {
    constructor(
        @Inject('leroy_db') private readonly leroy_db: mariadb.Pool,
        private readonly db: MariaDbService,
    ) { }

    async createSeccion(createSeccionDto: CreateSeccionDto) {
        const { nombre, id_sede, activo } = createSeccionDto;
        const insertId = await this.db.insert(
            this.leroy_db,
            'INSERT INTO secciones (nombre, id_sede, activo) VALUES (?, ?, ?)',
            [nombre, id_sede, activo]
        );
        return { id: insertId, nombre, id_sede, activo };
    }

    async findAllSeccion(query: QuerySeccionDto) {
        return await this.db.query(
            this.leroy_db,
            'SELECT id, nombre, id_sede, activo FROM secciones WHERE deleted_at IS NULL'
        );
    }

    async findOneSeccion(id: number) {
        const result = await this.db.query(
            this.leroy_db,
            'SELECT id, nombre, id_sede, activo FROM secciones WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        return result?.[0] ?? null;
    }

    async updateSeccion(id: number, updateSeccionDto: UpdateSeccionDto) {
        const { nombre, id_sede, activo } = updateSeccionDto;
        await this.db.update(
            this.leroy_db,
            'UPDATE secciones SET nombre = ?, id_sede = ?, activo = ? WHERE id = ?',
            [nombre, id_sede, activo, id]
        );
        return { id, nombre, id_sede, activo };
    }

    async removeSeccion(id: number) {
        await this.db.update(
            this.leroy_db,
            'UPDATE secciones SET deleted_at = NOW() WHERE id = ?',
            [id]
        );
        return { id };
    }
}
