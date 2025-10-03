import { Inject, Injectable } from '@nestjs/common';
import * as mariadb from 'mariadb';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { QueryPedidoDto } from './dto/query-pedido.dto';
import { MariaDbService } from 'src/database/mariadb/mariadb.service';

@Injectable()
export class PedidoRepository {
    constructor(
        @Inject('leroy_db') private readonly leroy_db: mariadb.Pool,
        private readonly db: MariaDbService,
    ) { }

    async createPedido(createPedidoDto: CreatePedidoDto) {
        const { boletin, cantidad, cesion, fecha, hora, id_estado, id_referencia, id_tipo_servicio, id_usuario } = createPedidoDto;
        const insertId = await this.db.insert(
            this.leroy_db,
            `INSERT INTO pedidos 
            (boletin, cantidad, cesion, fecha, hora, id_estado, id_referencia, id_tipo_servicio, id_usuario) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [boletin, cantidad, cesion, fecha, hora, id_estado, id_referencia, id_tipo_servicio, id_usuario]
        );
        return { id: insertId, boletin, cantidad, cesion, fecha, hora, id_estado, id_referencia, id_tipo_servicio, id_usuario };
    }

    async findAllPedido(query: QueryPedidoDto) {
        return await this.db.query(this.leroy_db,
            'SELECT * FROM pedidos WHERE deleted_at IS NULL'
        );
    }

    async findOnePedido(id: number) {
        const result = await this.db.query(this.leroy_db,
            'SELECT * FROM pedidos WHERE id = ? AND deleted_at IS NULL',
            [id]
        );
        return result?.[0] ?? null;
    }

    async updatePedido(id: number, updatePedidoDto: UpdatePedidoDto) {
        const { boletin, cantidad, cesion, fecha, hora, id_estado, id_referencia, id_tipo_servicio, id_usuario } = updatePedidoDto;
        await this.db.update(this.leroy_db,
            `UPDATE pedidos SET boletin = ?, cantidad = ?, cesion = ?, fecha = ?, hora = ?, id_estado = ?, id_referencia = ?, id_tipo_servicio = ?, id_usuario = ? 
            WHERE id = ?`,
            [boletin, cantidad, cesion, fecha, hora, id_estado, id_referencia, id_tipo_servicio, id_usuario, id]
        );
        return { id, boletin, cantidad, cesion, fecha, hora, id_estado, id_referencia, id_tipo_servicio, id_usuario };
    }

    async removePedido(id: number) {
        await this.db.update(this.leroy_db,
            'UPDATE pedidos SET deleted_at = NOW() WHERE id = ?',
            [id]
        );
        return { id };
    }
}
