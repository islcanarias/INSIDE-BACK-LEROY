import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import * as mariadb from 'mariadb';
import { MariaDbService } from './mariadb.service';

@Injectable()
export class DbStatusService {
    constructor(
        @Inject('core_db') private readonly core_db: mariadb.Pool,
        @Inject('transporte_db') private readonly transporte_db: mariadb.Pool,
        //@Inject('otra_db') private readonly otraDb: Pool,
        //@Inject('log_db') private readonly log_db: Pool,
        //@Inject('users_db') private readonly users_db: Pool,
        private readonly dbHelper: MariaDbService,
    ) { }

    async getStatus(dbName: string): Promise<{ status: boolean }> {
        const dbMap: Record<string, mariadb.Pool> = {
            core_db: this.core_db,
            transporte_db: this.transporte_db,
            //log: this.log_db,
            //users: this.users_db,
        };

        const pool = dbMap[dbName];
        if (!pool) {
            throw new BadRequestException('Base de datos desconocida');
        }

        const status = await this.dbHelper.ping(pool);
        return { status };
    }

    /*
    async getStatus(): Promise<{ status_core_db: boolean; status_otra: boolean }> {
        const [db, otra] = await Promise.all([
            this.dbHelper.ping(this.core_db),
            this.dbHelper.ping(this.otra_db),
        ]);
        return { status_core_db: db, status_otra: otra };
    }
    */

}