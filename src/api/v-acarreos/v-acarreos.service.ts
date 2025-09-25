import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/cliente/create-cliente.dto';
import { UpdateClienteDto } from './dto/cliente/update-cliente.dto';
import { CreateIEDto } from './dto/ie/create-ie.dto';
import { UpdateIEDto } from './dto/ie/update-ie.dto';
import { CreateTamanioDto } from './dto/tamanio/create-tamanio.dto';
import { UpdateTamanioDto } from './dto/tamanio/update-tamanio.dto';
import { CreateConductorDto } from './dto/conductor/create-conductor.dto';
import { CreateMatriculaDto } from './dto/matricula/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/matricula/update-matricula.dto';
import { CreatePoblacionDto } from './dto/poblacion/create-poblacion.dto';
import { UpdatePoblacionDto } from './dto/poblacion/update-poblacion.dto';
import { CreateOrdenDto } from './dto/orden/create-orden.dto';
import { UpdateOrdenDto } from './dto/orden/update-orden.dto';
import { CreateAcarreoDto } from './dto/acarreo/create-acarreo.dto';
import { UpdateAcarreoDto } from './dto/acarreo/update-acarreo.dto';
import { VAcarreosRepository } from './v-acarreos.repository';
import { OkPacket } from 'src/interfaces/auth.interfaces';
import { QueryAcarreoDiasDto, QueryAcarreoDto } from './dto/acarreo/query-acarreo.dto';
import { QueryClienteDto } from './dto/cliente/query-cliente.dto';
import { QueryIEDto } from './dto/ie/query-ie.dto';
import { QueryTamanioDto } from './dto/tamanio/query-tamanio.dto';
import { CreateEstadoDto } from './dto/estado/create-estado.dto';
import { QueryEstadoDto } from './dto/estado/query-estado.dto';
import { UpdateEstadoDto } from './dto/estado/update-estado.dto';
import { QueryConductorDto } from './dto/conductor/query-conductor.dto';
import { UpdateConductorDto } from './dto/conductor/update-conductor.dto';
import { QueryMatriculaDto } from './dto/matricula/query-matricula.dto';
import { QueryPoblacionDto } from './dto/poblacion/query-poblacion.dto';
import { QueryOrdenDto } from './dto/orden/query-orden.dto';
import { CreateTamanioLetraDto } from './dto/tamanio_letra/create-tamanio-letra.dto';
import { QueryTamanioLetraDto } from './dto/tamanio_letra/query-tamanio-letra.dto';
import { UpdateTamanioLetraDto } from './dto/tamanio_letra/update-tamanio-letra.dto';
import { CreateTamanioNumDto } from './dto/tamanio_num/create-tamanio-num.dto';
import { QueryTamanioNumDto } from './dto/tamanio_num/query-tamanio-num.dto';
import { UpdateTamanioNumDto } from './dto/tamanio_num/update-tamanio-num.dto';
import { CreateConductorTipoDto } from './dto/conductor_tipo/create-conductor-tipo.dto';
import { QueryConductorTipoDto } from './dto/conductor_tipo/query-conductor-tipo.dto';
import { UpdateConductorTipoDto } from './dto/conductor_tipo/update-conductor-tipo.dto';
import { CreateMatriculaTipoDto } from './dto/matricula_tipo/create-matricula-tipo.dto';
import { QueryMatriculaTipoDto } from './dto/matricula_tipo/query-matricula-tipo.dto';
import { CreateIncidenciaTipoDto } from './dto/incidencia_tipo/create-incidencia-tipo.dto';
import { QueryIncidenciaTipoDto } from './dto/incidencia_tipo/query-incidencia-tipo.dto';
import { UpdateIncidenciaTipoDto } from './dto/incidencia_tipo/update-incidencia-tipo.dto';
import { UpdateMatriculaTipoDto } from './dto/matricula_tipo/update-matricula-tipo.dto';

@Injectable()
export class VAcarreosService {

    constructor(
        private readonly vacarreosRepository: VAcarreosRepository,
    ) { }

    /* Acarreos */
    async createAcarreo(createVAcarreoDto: CreateAcarreoDto): Promise<OkPacket> {
        return await this.vacarreosRepository.createAcarreo(createVAcarreoDto);
    }

    async findAllAcarreo(query: QueryAcarreoDto) {
        const rows = await this.vacarreosRepository.findAllAcarreo(query);

        return {
            ...rows,
            items: rows.items.map(row => ({
                id: row.id,
                expediente_transkal: row.expediente_transkal,
                fecha: row.fecha,
                hora: row.hora,
                estado: {
                    id: row.estado_id,
                    estado: row.estado_nombre,
                    color: row.estado_color,
                },
                cliente: {
                    id: row.cliente_id,
                    nombre: row.cliente_nombre,
                    color: row.cliente_color,
                },
                referencia_facturacion: row.referencia_facturacion,
                referencia_interna: row.referencia_interna,
                i_e: {
                    id: row.ie_id,
                    tipo: row.ie_tipo,
                },
                tamanio: {
                    id: row.tamanio_id,
                    numero: row.tamanio_num,
                    letra: row.tamanio_letra,
                    tamanio: (row.tamanio_num === "Sin asignar" || row.tamanio_letra === "Sin asignar")
                        ? "Sin asignar"
                        : row.tamanio_num + row.tamanio_letra
                },
                matricula: {
                    id: row.matricula_id,
                    matricula: row.matricula_valor,
                },
                poblacion: {
                    id: row.poblacion_id,
                    poblacion: row.poblacion,
                    provincia: row.provincia,
                    comunidad: row.comunidad,
                    latitud: row.latitud,
                    longitud: row.longitud,
                    distanciaValencia: row.distanciaValencia,
                },
                booking: row.booking,
                contenedor: row.contenedor,
                precinto: row.precinto,
                conductor1: {
                    id: row.conductor1_id,
                    nombre: row.conductor1_nombre,
                    tipo: {
                        id: row.conductor1_tipo_id,
                        tipo: row.conductor1_tipo_nombre,
                    },
                },
                conductor2: {
                    id: row.conductor2_id,
                    nombre: row.conductor2_nombre,
                    tipo: {
                        id: row.conductor2_tipo_id,
                        tipo: row.conductor2_tipo_nombre,
                    },
                },
                oe: { id: row.oe_id, tipo: row.oe_tipo },
                oa: { id: row.oa_id, tipo: row.oa_tipo },
                lugar: row.lugar,
                remolque: row.remolque,
                referencia_carga: row.referencia_carga,
                observacion: row.observacion,
                incidenciaTipo: {
                    id: row.incidencia_tipo_id,
                    tipo: row.incidencia_tipo_nombre,
                },
                incidenciaDetalle: row.incidencia_detalle,
            })),
        };

    }

    async findAllAcarreoDias(query: QueryAcarreoDiasDto) {
        return await this.vacarreosRepository.findAllAcarreoDias(query);
    }

    async findOneAcarreo(id: number) {
        return await this.vacarreosRepository.findOneAcarreo(id);
    }

    async updateAcarreo(id: number, updateVAcarreoDto: UpdateAcarreoDto) {
        return await this.vacarreosRepository.updateAcarreo(id, updateVAcarreoDto);
    }

    async removeAcarreo(id: number): Promise<OkPacket> {
        return await this.vacarreosRepository.removeAcarreo(id);
    }

    /* Cliente */
    async createCliente(createClienteDto: CreateClienteDto) {
        return await this.vacarreosRepository.createCliente(createClienteDto);
    }

    async findAllCliente(query: QueryClienteDto) {
        return await this.vacarreosRepository.findAllCliente(query);
    }

    async findOneCliente(id: number) {
        return await this.vacarreosRepository.findOneCliente(id);
    }

    async updateCliente(id: number, updateClienteDto: UpdateClienteDto) {
        return await this.vacarreosRepository.updateCliente(id, updateClienteDto);
    }

    async removeCliente(id: number) {
        return await this.vacarreosRepository.removeCliente(id);
    }

    /* IE */
    async createIE(createIEDto: CreateIEDto) {
        return this.vacarreosRepository.createIE(createIEDto);
    }

    async findAllIE(query: QueryIEDto) {
        return await this.vacarreosRepository.findAllIE(query);
    }

    async findOneIE(id: number) {
        return await this.vacarreosRepository.findOneIE(id);
    }

    async updateIE(id: number, updateIEDto: UpdateIEDto) {
        return await this.vacarreosRepository.updateIE(id, updateIEDto);
    }

    async removeIE(id: number) {
        return await this.vacarreosRepository.removeIE(id);
    }

    /* Estados */
    async createEstado(createEstadoDto: CreateEstadoDto) {
        return await this.vacarreosRepository.createEstado(createEstadoDto);
    }

    async findAllEstado(query: QueryEstadoDto) {
        return await this.vacarreosRepository.findAllEstado(query);
    }

    async findOneEstado(id: number) {
        return await this.vacarreosRepository.findOneEstado(id);
    }

    async updateEstado(id: number, updateEstadoDto: UpdateEstadoDto) {
        return await this.vacarreosRepository.updateEstado(id, updateEstadoDto);
    }

    async removeEstado(id: number) {
        return await this.vacarreosRepository.removeEstado(id);
    }

    /* Tamaño */
    async createTamanio(createTamanioDto: CreateTamanioDto) {
        return await this.vacarreosRepository.createTamanio(createTamanioDto);
    }

    async findAllTamanio(query: QueryTamanioDto) {
        const rows = await this.vacarreosRepository.findAllTamanio(query);

        return {
            ...rows,
            items: rows.items.map(row => ({
                id: row.id,
                tamanio_num: row.tamanio_num,
                tamanio_letra: row.tamanio_letra,
                tamanio: (row.tamanio_num === "Sin asignar" || row.tamanio_letra === "Sin asignar")
                    ? "Sin asignar"
                    : row.tamanio_num + row.tamanio_letra
            })),
        }
    }

    async findOneTamanio(id: number) {
        return await this.vacarreosRepository.findOneTamanio(id);
    }

    async updateTamanio(id: number, updateTamanioDto: UpdateTamanioDto) {
        return await this.vacarreosRepository.updateTamanio(id, updateTamanioDto);
    }

    async removeTamanio(id: number) {
        return await this.vacarreosRepository.removeTamanio(id);
    }

    /* TamañoLetra */
    async createTamanioLetra(createTamanioLetraDto: CreateTamanioLetraDto) {
        return await this.vacarreosRepository.createTamanioLetra(createTamanioLetraDto);
    }

    async findAllTamanioLetra(query: QueryTamanioLetraDto) {
        return await this.vacarreosRepository.findAllTamanioLetra(query);
    }

    async findOneTamanioLetra(id: number) {
        return await this.vacarreosRepository.findOneTamanioLetra(id);
    }

    async updateTamanioLetra(id: number, updateTamanioLetraDto: UpdateTamanioLetraDto) {
        return await this.vacarreosRepository.updateTamanioLetra(id, updateTamanioLetraDto);
    }

    async removeTamanioLetra(id: number) {
        return await this.vacarreosRepository.removeTamanioLetra(id);
    }

    /* TamañoNum */
    async createTamanioNum(createTamanioNumDto: CreateTamanioNumDto) {
        return await this.vacarreosRepository.createTamanioNum(createTamanioNumDto);
    }

    async findAllTamanioNum(query: QueryTamanioNumDto) {
        return await this.vacarreosRepository.findAllTamanioNum(query);
    }

    async findOneTamanioNum(id: number) {
        return await this.vacarreosRepository.findOneTamanioNum(id);
    }

    async updateTamanioNum(id: number, updateTamanioNumDto: UpdateTamanioNumDto) {
        return await this.vacarreosRepository.updateTamanioNum(id, updateTamanioNumDto);
    }

    async removeTamanioNum(id: number) {
        return await this.vacarreosRepository.removeTamanioNum(id);
    }

    /* conductores */
    async createConductor(createConductorDto: CreateConductorDto) {
        return await this.vacarreosRepository.createConductor(createConductorDto);
    }

    async findAllConductor(query: QueryConductorDto) {
        return await this.vacarreosRepository.findAllConductor(query);
    }

    async findOneConductor(id: number) {
        return await this.vacarreosRepository.findOneConductor(id);
    }

    async updateConductor(id: number, updateConductorDto: UpdateConductorDto) {
        return await this.vacarreosRepository.updateConductor(id, updateConductorDto);
    }

    async removeConductor(id: number) {
        return await this.vacarreosRepository.removeConductor(id);
    }

    /* TipoConductores */
    async createTipoConductor(createConductorTipoDto: CreateConductorTipoDto) {
        return await this.vacarreosRepository.createTipoConductor(createConductorTipoDto);
    }

    async findAllTipoConductor(query: QueryConductorTipoDto) {
        return await this.vacarreosRepository.findAllTipoConductor(query);
    }

    async findOneTipoConductor(id: number) {
        return await this.vacarreosRepository.findOneTipoConductor(id);
    }

    async updateTipoConductor(id: number, updateConductorTipoDto: UpdateConductorTipoDto) {
        return await this.vacarreosRepository.updateTipoConductor(id, updateConductorTipoDto);
    }

    async removeTipoConductor(id: number) {
        return await this.vacarreosRepository.removeTipoConductor(id);
    }

    /* Matricula */
    async createMatricula(createMatriculaDto: CreateMatriculaDto) {
        return await this.vacarreosRepository.createMatricula(createMatriculaDto);
    }

    async findAllMatricula(query: QueryMatriculaDto) {
        return await this.vacarreosRepository.findAllMatricula(query);
    }

    async findOneMatricula(id: number) {
        return await this.vacarreosRepository.findOneMatricula(id);
    }

    async updateMatricula(id: number, updateMatriculaDto: UpdateMatriculaDto) {
        return await this.vacarreosRepository.updateMatricula(id, updateMatriculaDto);
    }

    async removeMatricula(id: number) {
        return await this.vacarreosRepository.removeMatricula(id);
    }

    /* TipoMatricula */
    async createTipoMatricula(createMatriculaTipoDto: CreateMatriculaTipoDto) {
        return await this.vacarreosRepository.createTipoMatricula(createMatriculaTipoDto);
    }

    async findAllTipoMatricula(query: QueryMatriculaTipoDto) {
        return await this.vacarreosRepository.findAllTipoMatricula(query);
    }

    async findOneTipoMatricula(id: number) {
        return await this.vacarreosRepository.findOneTipoMatricula(id);
    }

    async updateTipoMatricula(id: number, updateMatriculaTipoDto: UpdateMatriculaTipoDto) {
        return await this.vacarreosRepository.updateTipoMatricula(id, updateMatriculaTipoDto);
    }

    async removeTipoMatricula(id: number) {
        return await this.vacarreosRepository.removeTipoMatricula(id);
    }

    /* Poblacion */
    async createPoblacion(createPoblacionDto: CreatePoblacionDto) {
        return await this.vacarreosRepository.createPoblacion(createPoblacionDto);
    }

    async findAllPoblacion(query: QueryPoblacionDto) {
        return await this.vacarreosRepository.findAllPoblacion(query);
    }

    async findOnePoblacion(id: number) {
        return await this.vacarreosRepository.findOnePoblacion(id);
    }

    async updatePoblacion(id: number, updatePoblacionDto: UpdatePoblacionDto) {
        return await this.vacarreosRepository.updatePoblacion(id, updatePoblacionDto);
    }

    async removePoblacion(id: number) {
        return await this.vacarreosRepository.removePoblacion(id);
    }

    /* Ordenes */
    async createOrden(createOrdenDto: CreateOrdenDto) {
        return await this.vacarreosRepository.createOrden(createOrdenDto);
    }

    async findAllOrden(query: QueryOrdenDto) {
        return await this.vacarreosRepository.findAllOrden(query);
    }

    async findOneOrden(id: number) {
        return await this.vacarreosRepository.findOneOrden(id);
    }

    async updateOrden(id: number, updateOrdenDto: UpdateOrdenDto) {
        return await this.vacarreosRepository.updateOrden(id, updateOrdenDto);
    }

    async removeOrden(id: number) {
        return await this.vacarreosRepository.removeOrden(id);
    }

    /* TipoIncidencias */
    async createTipoIncidencia(createIncidenciaTipoDto: CreateIncidenciaTipoDto) {
        return await this.vacarreosRepository.createTipoIncidencia(createIncidenciaTipoDto);
    }

    async findAllTipoIncidencia(query: QueryIncidenciaTipoDto) {
        return await this.vacarreosRepository.findAllTipoIncidencia(query);
    }

    async findOneTipoIncidencia(id: number) {
        return await this.vacarreosRepository.findOneTipoIncidencia(id);
    }

    async updateTipoIncidencia(id: number, updateIncidenciaTipoDto: UpdateIncidenciaTipoDto) {
        return await this.vacarreosRepository.updateTipoIncidencia(id, updateIncidenciaTipoDto);
    }

    async removeTipoIncidencia(id: number) {
        return await this.vacarreosRepository.removeTipoIncidencia(id);
    }
}