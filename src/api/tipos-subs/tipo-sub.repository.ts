import { Inject, Injectable } from '@nestjs/common';
import * as mariadb from 'mariadb';
import { CreateTipoSubDto } from './dto/create-tipo-sub.dto';
import { UpdateTipoSubDto } from './dto/update-tipo-sub.dto';
import { QueryTipoSubDto } from './dto/query-tipo-sub.dto';
import { MariaDbService } from 'src/database/mariadb/mariadb.service';

@Injectable()
export class TipoSubRepository {
    constructor(
        @Inject('leroy_db') private readonly leroy_db: mariadb.Pool,
        private readonly db: MariaDbService,
    ) { }

    async createTipoSub(createTipoSubDto: CreateTipoSubDto) {
        const { id_tipo, id_sub } = createTipoSubDto;
        const insertId = await this.db.insert(
            this.leroy_db,
            'INSERT INTO tipos_subs (id_tipo, id_sub) VALUES (?, ?)',
            [id_tipo, id_sub]
        );
        return { id: insertId, id_tipo, id_sub };
    }

    async findAllTipoSub(query: QueryTipoSubDto) {
        return await this.db.query(
            this.leroy_db,
            'SELECT id, id_tipo, id_sub FROM tipos_subs WHERE deleted_at IS NULL'
        );
    }

    async findOneTipoSub(id: number) {
        const result = await this.db.query(
            this.leroy_db,
            'SELECT id, id_tipo, id_sub FROM tipos_subs WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        return result?.[0] ?? null;
    }

    async updateTipoSub(id: number, updateTipoSubDto: UpdateTipoSubDto) {
        const { id_tipo, id_sub } = updateTipoSubDto;
        await this.db.update(
            this.leroy_db,
            'UPDATE tipos_subs SET id_tipo = ?, id_sub = ? WHERE id = ?',
            [id_tipo, id_sub, id]
        );
        return { id, id_tipo, id_sub };
    }

    async removeTipoSub(id: number) {
        await this.db.update(
            this.leroy_db,
            'UPDATE tipos_subs SET deleted_at = NOW() WHERE id = ?',
            [id]
        );
        return { id };
    }
}
