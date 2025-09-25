import { Module } from '@nestjs/common';
import { TransporteController } from './transporte.controller';
import { TransporteService } from './transporte.service';
import { TransporteRepository } from './transporte.repository';
import { MariadbModule } from 'src/database/mariadb/mariadb.module';

@Module({
    imports: [MariadbModule],
    controllers: [TransporteController],
    providers: [TransporteService, TransporteRepository],
    exports: [TransporteService, TransporteRepository]
})
export class TransporteModule { }
