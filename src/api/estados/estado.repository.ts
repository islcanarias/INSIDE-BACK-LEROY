import { Inject, Injectable } from '@nestjs/common';
import * as mariadb from 'mariadb';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { QueryEstadoDto } from './dto/query-estado.dto';
import { MariaDbService } from 'src/database/mariadb/mariadb.service';

@Injectable()
export class EstadoRepository {
    constructor(
        @Inject('leroy_db') private readonly leroy_db: mariadb.Pool,
        private readonly db: MariaDbService,
    ) { }

    async createEstado(createEstadoDto: CreateEstadoDto) {
        const { nombre, id_sede } = createEstadoDto;
        return await this.db.insert(this.leroy_db,
            'INSERT INTO estados (nombre, id_sede) VALUES (?, ?)',
            [nombre, id_sede]
        );
    }

    async findAllEstado(query: QueryEstadoDto) {
        return await this.db.query(this.leroy_db,
            'SELECT id, nombre, id_sede FROM estados WHERE deleted_at IS NULL'
        );
    }

    async findOneEstado(id: number) {
        const result = await this.db.query(this.leroy_db,
            'SELECT id, nombre, id_sede FROM estados WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        return result?.[0] ?? null;
    }

    async updateEstado(id: number, updateEstadoDto: UpdateEstadoDto) {
        const { nombre, id_sede } = updateEstadoDto;
        return await this.db.update(this.leroy_db,
            'UPDATE estados SET nombre = ?, id_sede = ? WHERE id = ?',
            [nombre, id_sede, id]
        );
    }

    async removeEstado(id: number) {
        return await this.db.update(this.leroy_db,
            'UPDATE estados SET deleted_at = NOW() WHERE id = ?',
            [id]
        );
    }
}
