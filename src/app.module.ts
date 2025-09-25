import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TransporteModule } from './api/transporte/transporte.module';
import { VAcarreosModule } from './api/v-acarreos/v-acarreos.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'INSIDE-FRONT-LEROY-HOME', 'dist'),
      serveRoot: '/home',
      exclude: ['/api*'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'INSIDE-FRONT-LEROY-PEDIDOS', 'dist'),
      serveRoot: '/pedidos',
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
