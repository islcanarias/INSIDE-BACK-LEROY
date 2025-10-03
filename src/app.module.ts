import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GestionPedidosModule } from './api/pedidos.module';

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
    GestionPedidosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
