import { Controller, Get, Param } from '@nestjs/common';
import { DbStatusService } from './db-status.service';

@Controller('db-status')
export class DbStatusController {

    constructor(
        private readonly dbStatusService: DbStatusService
    ) { }

    @Get(':db')
    async checkStatus(@Param('db') db: string) {
        return await this.dbStatusService.getStatus(db);
    }
}