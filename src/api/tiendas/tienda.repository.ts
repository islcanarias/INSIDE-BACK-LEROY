import { Inject, Injectable } from '@nestjs/common';
import * as mariadb from 'mariadb';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { UpdateTiendaDto } from './dto/update-tienda.dto';
import { QueryTiendaDto } from './dto/query-tienda.dto';
import { MariaDbService } from 'src/database/mariadb/mariadb.service';

@Injectable()
export class TiendaRepository {
    constructor(
        @Inject('leroy_db') private readonly leroy_db: mariadb.Pool,
        private readonly db: MariaDbService,
    ) { }

    async createTienda(createTiendaDto: CreateTiendaDto) {
        const { nombre, id_sede, activo } = createTiendaDto;
        const insertId = await this.db.insert(
            this.leroy_db,
            'INSERT INTO tiendas (nombre, id_sede, activo) VALUES (?, ?, ?)',
            [nombre, id_sede, activo]
        );
        return { id: insertId, nombre, id_sede, activo };
    }

    async findAllTienda(query: QueryTiendaDto) {
        return await this.db.query(
            this.leroy_db,
            'SELECT id, nombre, id_sede, activo FROM tiendas WHERE deleted_at IS NULL'
        );
    }

    async findOneTienda(id: number) {
        const result = await this.db.query(
            this.leroy_db,
            'SELECT id, nombre, id_sede, activo FROM tiendas WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        return result?.[0] ?? null;
    }

    async updateTienda(id: number, updateTiendaDto: UpdateTiendaDto) {
        const { nombre, id_sede, activo } = updateTiendaDto;
        await this.db.update(
            this.leroy_db,
            'UPDATE tiendas SET nombre = ?, id_sede = ?, activo = ? WHERE id = ?',
            [nombre, id_sede, activo, id]
        );
        return { id, nombre, id_sede, activo };
    }

    async removeTienda(id: number) {
        await this.db.update(
            this.leroy_db,
            'UPDATE tiendas SET deleted_at = NOW() WHERE id = ?',
            [id]
        );
        return { id };
    }
}
