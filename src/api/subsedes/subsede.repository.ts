import { Inject, Injectable } from '@nestjs/common';
import * as mariadb from 'mariadb';
import { CreateSubsedeDto } from './dto/create-subsede.dto';
import { UpdateSubsedeDto } from './dto/update-subsede.dto';
import { QuerySubsedeDto } from './dto/query-subsede.dto';
import { MariaDbService } from 'src/database/mariadb/mariadb.service';

@Injectable()
export class SubsedeRepository {
    constructor(
        @Inject('leroy_db') private readonly leroy_db: mariadb.Pool,
        private readonly db: MariaDbService,
    ) { }

    async createSubsede(createSubsedeDto: CreateSubsedeDto) {
        const { nombre, id_sede } = createSubsedeDto;
        const insertId = await this.db.insert(
            this.leroy_db,
            'INSERT INTO subsede (nombre, id_sede) VALUES (?, ?)',
            [nombre, id_sede]
        );
        return { id: insertId, nombre, id_sede };
    }

    async findAllSubsede(query: QuerySubsedeDto) {
        let sql = 'SELECT id, nombre, id_sede FROM subsede WHERE deleted_at IS NULL';
        return await this.db.query(this.leroy_db, sql);
    }

    async findOneSubsede(id: number) {
        const result = await this.db.query(
            this.leroy_db,
            'SELECT id, nombre, id_sede FROM subsede WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        return result?.[0] ?? null;
    }

    async updateSubsede(id: number, updateSubsedeDto: UpdateSubsedeDto) {
        const { nombre, id_sede } = updateSubsedeDto;
        await this.db.update(
            this.leroy_db,
            'UPDATE subsede SET nombre = ?, id_sede = ? WHERE id = ?',
            [nombre, id_sede, id]
        );
        return { id, nombre, id_sede };
    }

    async removeSubsede(id: number) {
        await this.db.update(
            this.leroy_db,
            'UPDATE subsede SET deleted_at = NOW() WHERE id = ?',
            [id]
        );
        return { id };
    }
}
