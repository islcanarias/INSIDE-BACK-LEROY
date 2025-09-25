import { Module } from '@nestjs/common';
import { VAcarreosService } from './v-acarreos.service';
import { VAcarreosController } from './v-acarreos.controller';
import { MariadbModule } from 'src/database/mariadb/mariadb.module';
import { VAcarreosRepository } from './v-acarreos.repository';

@Module({
  imports: [MariadbModule],
  controllers: [VAcarreosController],
  providers: [VAcarreosService, VAcarreosRepository],
  exports: [VAcarreosService, VAcarreosRepository],
})
export class VAcarreosModule { }
