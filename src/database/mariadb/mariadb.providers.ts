import '@env';
import * as mariadb from 'mariadb';
import { Provider } from '@nestjs/common';

export const MariadbProviders: Provider[] = [
    {
        provide: 'core_db',
        useValue: mariadb.createPool({
            host: process.env.MARIADB_CORE_DB_HOST,
            user: process.env.MARIADB_CORE_DB_USER,
            password: process.env.MARIADB_CORE_DB_PASS,
            database: process.env.MARIADB_CORE_DB_DATABASE,
            port: Number(process.env.MARIADB_CORE_DB_PORT)
        }),
    },
    {
        provide: 'transporte_db',
        useValue: mariadb.createPool({
            host: process.env.MARIADB_TRANSPORTE_DB_HOST,
            user: process.env.MARIADB_TRANSPORTE_DB_USER,
            password: process.env.MARIADB_TRANSPORTE_DB_PASS,
            database: process.env.MARIADB_TRANSPORTE_DB_DATABASE,
            port: Number(process.env.MARIADB_TRANSPORTE_DB_PORT)
        }),
    }
    // Si hay más bases de datos, se ponen aquí
];