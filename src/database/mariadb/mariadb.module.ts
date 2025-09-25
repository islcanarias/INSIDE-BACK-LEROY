import { Module } from '@nestjs/common';
import { MariadbProviders } from './mariadb.providers';
import { MariaDbService } from './mariadb.service';
import { DbStatusController } from './db-status.controller';
import { DbStatusService } from './db-status.service';

@Module({
    providers: [...MariadbProviders, MariaDbService, DbStatusService],
    controllers: [DbStatusController],
    exports: [...MariadbProviders, MariaDbService, DbStatusService],
})
export class MariadbModule { }