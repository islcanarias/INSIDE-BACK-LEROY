import { Inject, Injectable } from '@nestjs/common';
import * as mariadb from 'mariadb';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { QueryUsuarioDto } from './dto/query-usuario.dto';
import { MariaDbService } from 'src/database/mariadb/mariadb.service';

@Injectable()
export class UsuarioRepository {
    constructor(
        @Inject('leroy_db') private readonly leroy_db: mariadb.Pool,
        private readonly db: MariaDbService,
    ) { }

    async createUsuario(createUsuarioDto: CreateUsuarioDto) {
        const { id_rol, activo } = createUsuarioDto;
        const insertId = await this.db.insert(
            this.leroy_db,
            'INSERT INTO usuarios (id_rol, activo) VALUES (?, ?)',
            [id_rol, activo]
        );
        return { id: insertId, id_rol, activo };
    }

    async findAllUsuario(query: QueryUsuarioDto) {
        return await this.db.query(
            this.leroy_db,
            'SELECT id, id_rol, activo FROM usuarios WHERE deleted_at IS NULL'
        );
    }

    async findOneUsuario(id: number) {
        const result = await this.db.query(
            this.leroy_db,
            'SELECT id, id_rol, activo FROM usuarios WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        return result?.[0] ?? null;
    }

    async updateUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto) {
        const { id_rol, activo } = updateUsuarioDto;
        await this.db.update(
            this.leroy_db,
            'UPDATE usuarios SET id_rol = ?, activo = ? WHERE id = ?',
            [id_rol, activo, id]
        );
        return { id, id_rol, activo };
    }

    async removeUsuario(id: number) {
        await this.db.update(
            this.leroy_db,
            'UPDATE usuarios SET deleted_at = NOW() WHERE id = ?',
            [id]
        );
        return { id };
    }
}
