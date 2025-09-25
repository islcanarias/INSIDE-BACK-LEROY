import { Inject, Injectable } from "@nestjs/common";
import * as mariadb from 'mariadb';
import { MariaDbService } from "src/database/mariadb/mariadb.service";

@Injectable()
export class TransporteRepository {
    constructor(
        @Inject('transporte_db') private readonly transporte_db: mariadb.Pool,
        private readonly db_helper: MariaDbService,
    ) { }

    async getRutas(nombreOperativa: string) {
        const sql = `SELECT * FROM rutas WHERE id_operativa = (SELECT id FROM operativas WHERE nombre = ? LIMIT 1)`;
        return await this.db_helper.select(
            this.transporte_db,
            sql,
            [nombreOperativa]
        );
    }

    async getParadas() {
        const sql = `SELECT * FROM paradas`;
        return await this.db_helper.select(
            this.transporte_db,
            sql
        );
    }

    async getParadasPorOperativa(nombreOperativa: string) {
        const sql = `
            SELECT p.* FROM paradas p
            JOIN rutas r ON p.id_ruta = r.id
            WHERE r.id_operativa = (SELECT id FROM operativas WHERE nombre = ? LIMIT 1)
            ORDER BY p.orden
        `;
        return await this.db_helper.select(
            this.transporte_db,
            sql,
            [nombreOperativa]
        );
    }

    async patchParadas(paradaId: string, id_ruta: number, orden: number) {
        const sql = `UPDATE paradas SET id_ruta = ?, orden = ? WHERE id = ?`;
        return await this.db_helper.update(this.transporte_db, sql, [id_ruta, orden, paradaId]);
    }

    async reordenarParadas(paradas: { id: string; id_ruta: number; orden: number }[]) {
        return await this.db_helper.transaction(this.transporte_db, async (conn) => {
            // Paso 1: Orden temporal negativo único (sin usar id_ruta para evitar colisión)
            for (let i = 0; i < paradas.length; i++) {
                const p = paradas[i];
                await conn.execute(
                    `UPDATE paradas SET orden = ? WHERE id = ?`,
                    [-1 * (i + 1), p.id]
                );
            }

            // Paso 2: Asignar orden e id_ruta definitivos
            for (let i = 0; i < paradas.length; i++) {
                const p = paradas[i];
                await conn.execute(
                    `UPDATE paradas SET orden = ?, id_ruta = ? WHERE id = ?`,
                    [p.orden, p.id_ruta, p.id]
                );
            }

            return { updated: paradas.length };
        });
    }

    async insertParada(parada: {
        id_ruta: number;
        nombre: string;
        latitud: number;
        longitud: number;
        descripcion: string;
        orden: number;
    }) {
        const sql = `
        INSERT INTO paradas (id_ruta, nombre, latitud, longitud, descripcion, orden)
        VALUES (?, ?, ?, ?, ?, ?)
        `;

        return await this.db_helper.insert(this.transporte_db, sql, [
            parada.id_ruta,
            parada.nombre,
            parada.latitud,
            parada.longitud,
            parada.descripcion,
            parada.orden,
        ]);
    }

    async insertRuta(ruta: {
        nombre: string;
        operativa: string;
    }) {
        const sql = `
        INSERT INTO rutas (nombre, id_operativa)
        VALUES (?, (SELECT id FROM operativas WHERE nombre=?))
        `;

        return await this.db_helper.insert(this.transporte_db, sql, [
            ruta.nombre,
            ruta.operativa,

        ]);
    }

    async actualizarParada(
        id: string,
        updates: Partial<{
            nombre: string;
            latitud: number;
            longitud: number;
            descripcion: string;
        }>
    ) {
        const campos: string[] = [];
        const valores: (string | number)[] = [];

        if (updates.nombre !== undefined) {
            campos.push('nombre = ?');
            valores.push(updates.nombre);
        }
        if (updates.latitud !== undefined) {
            campos.push('latitud = ?');
            valores.push(updates.latitud);
        }
        if (updates.longitud !== undefined) {
            campos.push('longitud = ?');
            valores.push(updates.longitud);
        }
        if (updates.descripcion !== undefined) {
            campos.push('descripcion = ?');
            valores.push(updates.descripcion);
        }

        if (campos.length === 0) return { affectedRows: 0 }; // Nada que actualizar

        const sql = `UPDATE paradas SET ${campos.join(', ')} WHERE id = ?`;
        valores.push(id);

        return await this.db_helper.update(this.transporte_db, sql, valores);
    }

    async eliminarParada(id: string) {
        const sql = `DELETE FROM paradas WHERE id = ?`;
        return await this.db_helper.delete(this.transporte_db, sql, [id]);
    }

    async eliminarRuta(id: string) {
        const sql = `DELETE FROM rutas WHERE id = ?`;
        return await this.db_helper.delete(this.transporte_db, sql, [id]);
    }


    async getParadasByRuta(id_ruta: number) {
    const sql = `
        SELECT id, nombre, latitud, longitud, orden
        FROM paradas
        WHERE id_ruta = ?
        ORDER BY orden ASC
    `;
    return await this.db_helper.select(this.transporte_db, sql, [id_ruta]);
}

async guardarOrdenOptimizado(paradas: { id: string; orden: number }[]) {
    return await this.db_helper.transaction(this.transporte_db, async (conn) => {
        // Paso 1: asignar orden temporal negativo
        for (let i = 0; i < paradas.length; i++) {
            const p = paradas[i];
            if (!p.id) continue;
            await conn.execute(
                `UPDATE paradas SET orden = ? WHERE id = ?`,
                [-1 * (i + 1), p.id]
            );
        }

        // Paso 2: asignar orden definitivo
        for (let i = 0; i < paradas.length; i++) {
            const p = paradas[i];
            if (!p.id) continue;
            await conn.execute(
                `UPDATE paradas SET orden = ? WHERE id = ?`,
                [p.orden, p.id]
            );
        }

        return { updated: paradas.length };
    });
}

}