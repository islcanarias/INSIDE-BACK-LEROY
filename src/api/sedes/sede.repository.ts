import { Inject, Injectable } from '@nestjs/common';
import * as mariadb from 'mariadb';
import { CreateSedeDto } from './dto/create-sede.dto';
import { UpdateSedeDto } from './dto/update-sede.dto';
import { QuerySedeDto } from './dto/query-sede.dto';
import { MariaDbService } from 'src/database/mariadb/mariadb.service';

@Injectable()
export class SedeRepository {
    constructor(
        @Inject('leroy_db') private readonly leroy_db: mariadb.Pool,
        private readonly db: MariaDbService,
    ) { }

    async createSede(createSedeDto: CreateSedeDto) {
        const { nombre } = createSedeDto;
        const insertId = await this.db.insert(
            this.leroy_db,
            'INSERT INTO sede (nombre) VALUES (?)',
            [nombre]
        );
        return { id: insertId, nombre };
    }

    async findAllSede(query: QuerySedeDto) {
        let sql = 'SELECT id, nombre FROM sede WHERE deleted_at IS NULL';
        // aquí puedes agregar filtros dinámicos del query DTO si los necesitas
        return await this.db.query(this.leroy_db, sql);
    }

    async findOneSede(id: number) {
        const result = await this.db.query(
            this.leroy_db,
            'SELECT id, nombre FROM sede WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        return result?.[0] ?? null;
    }

    async updateSede(id: number, updateSedeDto: UpdateSedeDto) {
        const { nombre } = updateSedeDto;
        await this.db.update(
            this.leroy_db,
            'UPDATE sede SET nombre = ? WHERE id = ?',
            [nombre, id]
        );
        return { id, nombre };
    }

    async removeSede(id: number) {
        await this.db.update(
            this.leroy_db,
            'UPDATE sede SET deleted_at = NOW() WHERE id = ?',
            [id]
        );
        return { id };
    }
}
