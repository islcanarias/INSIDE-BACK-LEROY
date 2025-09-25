import { Injectable } from '@nestjs/common';
import { Pool, PoolConnection } from 'mariadb';
import { OkPacket } from 'src/interfaces/auth.interfaces';

@Injectable()
export class MariaDbService {

    /**
     * Ejecuta una función dentro de una transacción.
     * Hace rollback automático si hay error.
     */
    async transaction<T>(pool: Pool, callback: (conn: PoolConnection) => Promise<T>): Promise<T> {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();
            const result = await callback(conn);
            await conn.commit();
            return result;
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }

    //const values = items.map(item => [item.val1, item.val2]);
    //const users = [[1, 'Juan'], [2, 'Ana'], [3, 'Luis']];
    async batch(pool: Pool, sql: string, paramsArray: any[][], transaction = false): Promise<OkPacket[]> {
        if (transaction) {
            return await this.transaction(pool, async (conn) => {
                return conn.batch(sql, paramsArray);
            });
        }

        const conn = await pool.getConnection();
        try {
            return await conn.batch(sql, paramsArray);
        } finally {
            conn.release();
        }
    }

    private async exec(pool: Pool, sql: string, consoleError: string, params?: any[]): Promise<OkPacket> {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query(sql, params);
            return this.convertBigIntToNumber(result); // 🔹 Aquí convertimos
        } catch (error) {
            console.error(consoleError, error);
            throw error;
        } finally {
            conn.release();
        }
    }


    async insert(pool: Pool, sql: string, params?: any[]): Promise<OkPacket> {
        return await this.exec(pool, sql, 'Database insert failed', params);
    }

    async delete(pool: Pool, sql: string, params?: any[]): Promise<OkPacket> {
        return await this.exec(pool, sql, 'Database delete failed', params);
    }

    async update(pool: Pool, sql: string, params?: any[]): Promise<OkPacket> {
        return await this.exec(pool, sql, 'Database update failed', params);
    }

    async select<T = any>(pool: Pool, sql: string, params?: any[]): Promise<T[] | null> {
        return await this.query(pool, sql, params);
    }

    async selectOne<T = any>(pool: Pool, sql: string, params?: any[]): Promise<T | null> {
        return await this.queryOne(pool, sql, params);
    }

    async query<T = any>(pool: Pool, sql: string, params?: any[]): Promise<T[] | null> {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query<T[]>(sql, params);
            const converted = this.convertBigIntToNumber(result);
            return converted.length > 0 ? converted : null;
        } catch (error) {
            console.error('Database query failed:', error);
            throw error;
        } finally {
            conn.release();
        }
    }

    async queryOne<T = any>(pool: Pool, sql: string, params?: any[]): Promise<T | null> {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query<T[]>(sql, params);
            const converted = this.convertBigIntToNumber(result);
            return converted.length > 0 ? converted[0] : null;
        } catch (error) {
            console.error('Database query failed:', error);
            throw error;
        } finally {
            conn.release();
        }
    }

    async ping(pool: Pool): Promise<boolean> {
        let conn: PoolConnection | undefined;
        try {
            conn = await pool.getConnection();
            await conn.query('SELECT 1');
            return true;
        } catch {
            return false;
        } finally {
            if (conn) conn.release();
        }
    }

    /**
     * Convierte BigInt a number para evitar errores en JSON.stringify
     */
    private convertBigIntToNumber<T>(input: T): T {
        if (Array.isArray(input)) {
            return input.map(i => this.convertBigIntToNumber(i)) as T;
        }

        if (input && typeof input === 'object') {
            // Si es una fecha, devolverla como string ISO (YYYY-MM-DD)
            if (input instanceof Date) {
                return input.toISOString().split('T')[0] as unknown as T;
            }

            const converted: Record<string, any> = {};
            for (const [key, value] of Object.entries(input)) {
                if (typeof value === 'bigint') {
                    // Evita perder precisión con números grandes
                    converted[key] = value <= BigInt(Number.MAX_SAFE_INTEGER)
                        ? Number(value)
                        : value.toString();
                } else if (value instanceof Date) {
                    converted[key] = value.toISOString().split('T')[0];
                } else if (typeof value === 'object' && value !== null) {
                    converted[key] = this.convertBigIntToNumber(value);
                } else {
                    converted[key] = value;
                }
            }
            return converted as T;
        }

        return input;
    }


}
