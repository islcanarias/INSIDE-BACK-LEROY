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
      rootPath: join(__dirname, '..', '..', 'INSIDE-FRONT-TRANSPORTE-HOME', 'dist'),
      serveRoot: '/home',
      exclude: ['/api*'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'INSIDE-FRONT-TRANSPORTE-RUTASCOFARTE', 'dist'),
      serveRoot: '/disa',
      exclude: ['/api*'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'INSIDE-FRONT-TRANSPORTE-COFARTE', 'dist'),
      serveRoot: '/cofarte',
      exclude: ['/api*'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'INSIDE-FRONT-TRANSPORTE-V-ACARREOS', 'dist'),
      serveRoot: '/v-acarreos',
      exclude: ['/api*'],
    }),
    TransporteModule,
    VAcarreosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
