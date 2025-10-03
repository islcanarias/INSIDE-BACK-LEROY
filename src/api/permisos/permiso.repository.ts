import { Inject, Injectable } from '@nestjs/common';
import * as mariadb from 'mariadb';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { QueryPermisoDto } from './dto/query-permiso.dto';
import { MariaDbService } from 'src/database/mariadb/mariadb.service';

@Injectable()
export class PermisoRepository {
    constructor(
        @Inject('leroy_db') private readonly leroy_db: mariadb.Pool,
        private readonly db: MariaDbService,
    ) { }

    async createPermiso(createPermisoDto: CreatePermisoDto) {
        const { id_tienda, id_usuario } = createPermisoDto;
        const insertId = await this.db.insert(
            this.leroy_db,
            'INSERT INTO permisos (id_tienda, id_usuario) VALUES (?, ?)',
            [id_tienda, id_usuario]
        );
        return { id: insertId, id_tienda, id_usuario };
    }

    async findAllPermiso(query: QueryPermisoDto) {
        return await this.db.query(
            this.leroy_db,
            'SELECT id, id_tienda, id_usuario FROM permisos WHERE deleted_at IS NULL'
        );
    }

    async findOnePermiso(id: number) {
        const result = await this.db.query(
            this.leroy_db,
            'SELECT id, id_tienda, id_usuario FROM permisos WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        return result?.[0] ?? null;
    }

    async updatePermiso(id: number, updatePermisoDto: UpdatePermisoDto) {
        const { id_tienda, id_usuario } = updatePermisoDto;
        await this.db.update(
            this.leroy_db,
            'UPDATE permisos SET id_tienda = ?, id_usuario = ? WHERE id = ?',
            [id_tienda, id_usuario, id]
        );
        return { id, id_tienda, id_usuario };
    }

    async removePermiso(id: number) {
        await this.db.update(
            this.leroy_db,
            'UPDATE permisos SET deleted_at = NOW() WHERE id = ?',
            [id]
        );
        return { id };
    }
}
