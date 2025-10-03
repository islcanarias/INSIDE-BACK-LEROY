import { Module } from '@nestjs/common';
import { MariadbModule } from 'src/database/mariadb/mariadb.module';
import { EstadoController } from './estados/estado.controller';
import { PedidoController } from './pedidos/pedido.controller';
import { PermisoController } from './permisos/permiso.controller';
import { ReferenciaController } from './referencias/referencia.controller';
import { RolController } from './roles/rol.controller';
import { SeccionController } from './secciones/seccion.controller';
import { SedeController } from './sedes/sede.controller';
import { SubTipoServicioController } from './sub-tipos-servicios/sub-tipo-servicio.controller';
import { SubsedeController } from './subsedes/subsede.controller';
import { TiendaController } from './tiendas/tienda.controller';
import { TipoServicioController } from './tipos-servicios/tipo-servicio.controller';
import { TipoSubController } from './tipos-subs/tipo-sub.controller';
import { UsuarioController } from './usuarios/usuario.controller';
import { EstadoService } from './estados/estado.service';
import { EstadoRepository } from './estados/estado.repository';
import { PedidoService } from './pedidos/pedido.service';
import { PedidoRepository } from './pedidos/pedido.repository';
import { PermisoService } from './permisos/permiso.service';
import { PermisoRepository } from './permisos/permiso.repository';
import { ReferenciaService } from './referencias/referencia.service';
import { ReferenciaRepository } from './referencias/referencia.repository';
import { RolService } from './roles/rol.service';
import { RolRepository } from './roles/rol.repository';
import { SeccionService } from './secciones/seccion.service';
import { SeccionRepository } from './secciones/seccion.repository';
import { SedeService } from './sedes/sede.service';
import { SedeRepository } from './sedes/sede.repository';
import { SubTipoServicioService } from './sub-tipos-servicios/sub-tipo-servicio.service';
import { SubTipoServicioRepository } from './sub-tipos-servicios/sub-tipo-servicio.repository';
import { SubsedeService } from './subsedes/subsede.service';
import { SubsedeRepository } from './subsedes/subsede.repository';
import { TiendaService } from './tiendas/tienda.service';
import { TiendaRepository } from './tiendas/tienda.repository';
import { TipoServicioService } from './tipos-servicios/tipo-servicio.service';
import { TipoServicioRepository } from './tipos-servicios/tipo-servicio.repository';
import { TipoSubService } from './tipos-subs/tipo-sub.service';
import { TipoSubRepository } from './tipos-subs/tipo-sub.repository';
import { UsuarioService } from './usuarios/usuario.service';
import { UsuarioRepository } from './usuarios/usuario.repository';
@Module({
  imports: [MariadbModule],
  controllers: [
    EstadoController,
    PedidoController,
    PermisoController,
    ReferenciaController,
    RolController,
    SeccionController,
    SedeController,
    SubTipoServicioController,
    SubsedeController,
    TiendaController,
    TipoServicioController,
    TipoSubController,
    UsuarioController
  ],
  providers: [
    EstadoService, EstadoRepository,
    PedidoService, PedidoRepository,
    PermisoService, PermisoRepository,
    ReferenciaService, ReferenciaRepository,
    RolService, RolRepository,
    SeccionService, SeccionRepository,
    SedeService, SedeRepository,
    SubTipoServicioService, SubTipoServicioRepository,
    SubsedeService, SubsedeRepository,
    TiendaService, TiendaRepository,
    TipoServicioService, TipoServicioRepository,
    TipoSubService, TipoSubRepository,
    UsuarioService, UsuarioRepository
  ],
  exports: [
    EstadoService, EstadoRepository,
    PedidoService, PedidoRepository,
    PermisoService, PermisoRepository,
    ReferenciaService, ReferenciaRepository,
    RolService, RolRepository,
    SeccionService, SeccionRepository,
    SedeService, SedeRepository,
    SubTipoServicioService, SubTipoServicioRepository,
    SubsedeService, SubsedeRepository,
    TiendaService, TiendaRepository,
    TipoServicioService, TipoServicioRepository,
    TipoSubService, TipoSubRepository,
    UsuarioService, UsuarioRepository
  ],
})
export class GestionPedidosModule { }
