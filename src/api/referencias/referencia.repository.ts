import { Inject, Injectable } from '@nestjs/common';
import * as mariadb from 'mariadb';
import { CreateReferenciaDto } from './dto/create-referencia.dto';
import { UpdateReferenciaDto } from './dto/update-referencia.dto';
import { QueryReferenciaDto } from './dto/query-referencia.dto';
import { MariaDbService } from 'src/database/mariadb/mariadb.service';

@Injectable()
export class ReferenciaRepository {
    constructor(
        @Inject('leroy_db') private readonly leroy_db: mariadb.Pool,
        private readonly db: MariaDbService,
    ) { }

    async createReferencia(createReferenciaDto: CreateReferenciaDto) {
        const { referencia, descripcion, ean, activo, id_seccion, id_tienda } = createReferenciaDto;
        const insertId = await this.db.insert(
            this.leroy_db,
            'INSERT INTO referencias (referencia, descripcion, ean, activo, id_seccion, id_tienda) VALUES (?, ?, ?, ?, ?, ?)',
            [referencia, descripcion, ean, activo, id_seccion, id_tienda]
        );
        return { id: insertId, referencia, descripcion, ean, activo, id_seccion, id_tienda };
    }

    async findAllReferencia(query: QueryReferenciaDto) {
        return await this.db.query(
            this.leroy_db,
            'SELECT id, referencia, descripcion, ean, activo, id_seccion, id_tienda FROM referencias WHERE deleted_at IS NULL'
        );
    }

    async findOneReferencia(id: number) {
        const result = await this.db.query(
            this.leroy_db,
            'SELECT id, referencia, descripcion, ean, activo, id_seccion, id_tienda FROM referencias WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        return result?.[0] ?? null;
    }

    async updateReferencia(id: number, updateReferenciaDto: UpdateReferenciaDto) {
        const { referencia, descripcion, ean, activo, id_seccion, id_tienda } = updateReferenciaDto;
        await this.db.update(
            this.leroy_db,
            'UPDATE referencias SET referencia = ?, descripcion = ?, ean = ?, activo = ?, id_seccion = ?, id_tienda = ? WHERE id = ?',
            [referencia, descripcion, ean, activo, id_seccion, id_tienda, id]
        );
        return { id, referencia, descripcion, ean, activo, id_seccion, id_tienda };
    }

    async removeReferencia(id: number) {
        await this.db.update(
            this.leroy_db,
            'UPDATE referencias SET deleted_at = NOW() WHERE id = ?',
            [id]
        );
        return { id };
    }
}
