import { Inject, Injectable } from '@nestjs/common';
import * as mariadb from 'mariadb';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { QueryRolDto } from './dto/query-rol.dto';
import { MariaDbService } from 'src/database/mariadb/mariadb.service';

@Injectable()
export class RolRepository {
    constructor(
        @Inject('leroy_db') private readonly leroy_db: mariadb.Pool,
        private readonly db: MariaDbService,
    ) { }

    async createRol(createRolDto: CreateRolDto) {
        const { nombre } = createRolDto;
        const insertId = await this.db.insert(
            this.leroy_db,
            'INSERT INTO roles (nombre) VALUES (?)',
            [nombre]
        );
        return { id: insertId, nombre };
    }

    async findAllRol(query: QueryRolDto) {
        return await this.db.query(
            this.leroy_db,
            'SELECT id, nombre FROM roles WHERE deleted_at IS NULL'
        );
    }

    async findOneRol(id: number) {
        const result = await this.db.query(
            this.leroy_db,
            'SELECT id, nombre FROM roles WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        return result?.[0] ?? null;
    }

    async updateRol(id: number, updateRolDto: UpdateRolDto) {
        const { nombre } = updateRolDto;
        await this.db.update(
            this.leroy_db,
            'UPDATE roles SET nombre = ? WHERE id = ?',
            [nombre, id]
        );
        return { id, nombre };
    }

    async removeRol(id: number) {
        await this.db.update(
            this.leroy_db,
            'UPDATE roles SET deleted_at = NOW() WHERE id = ?',
            [id]
        );
        return { id };
    }
}
