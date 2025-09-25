import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { VAcarreosService } from './v-acarreos.service';
import { CreateAcarreoDto } from './dto/acarreo/create-acarreo.dto';
import { UpdateAcarreoDto } from './dto/acarreo/update-acarreo.dto';
import { CreateClienteDto } from './dto/cliente/create-cliente.dto';
import { UpdateClienteDto } from './dto/cliente/update-cliente.dto';
import { CreateIEDto } from './dto/ie/create-ie.dto';
import { UpdateIEDto } from './dto/ie/update-ie.dto';
import { CreateTamanioDto } from './dto/tamanio/create-tamanio.dto';
import { UpdateTamanioDto } from './dto/tamanio/update-tamanio.dto';
import { CreateMatriculaDto } from './dto/matricula/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/matricula/update-matricula.dto';
import { CreatePoblacionDto } from './dto/poblacion/create-poblacion.dto';
import { UpdatePoblacionDto } from './dto/poblacion/update-poblacion.dto';
import { CreateOrdenDto } from './dto/orden/create-orden.dto';
import { UpdateOrdenDto } from './dto/orden/update-orden.dto';
import { QueryAcarreoDiasDto, QueryAcarreoDto } from './dto/acarreo/query-acarreo.dto';
import { QueryClienteDto } from './dto/cliente/query-cliente.dto';
import { QueryIEDto } from './dto/ie/query-ie.dto';
import { QueryTamanioDto } from './dto/tamanio/query-tamanio.dto';
import { CreateEstadoDto } from './dto/estado/create-estado.dto';
import { QueryEstadoDto } from './dto/estado/query-estado.dto';
import { UpdateEstadoDto } from './dto/estado/update-estado.dto';
import { QueryMatriculaDto } from './dto/matricula/query-matricula.dto';
import { QueryPoblacionDto } from './dto/poblacion/query-poblacion.dto';
import { QueryOrdenDto } from './dto/orden/query-orden.dto';
import { CreateConductorDto } from './dto/conductor/create-conductor.dto';
import { QueryConductorDto } from './dto/conductor/query-conductor.dto';
import { UpdateConductorDto } from './dto/conductor/update-conductor.dto';
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
import { UpdateMatriculaTipoDto } from './dto/matricula_tipo/update-matricula-tipo.dto';
import { CreateIncidenciaTipoDto } from './dto/incidencia_tipo/create-incidencia-tipo.dto';
import { QueryIncidenciaTipoDto } from './dto/incidencia_tipo/query-incidencia-tipo.dto';
import { UpdateIncidenciaTipoDto } from './dto/incidencia_tipo/update-incidencia-tipo.dto';

@Controller('v-acarreos')
export class VAcarreosController {
    constructor(private readonly vAcarreosService: VAcarreosService) { }

    /* Acarreos */
    @Post('acarreos')
    async createAcarreo(@Body() createAcarreoDto: CreateAcarreoDto) {
        console.log('Acarreo: ', createAcarreoDto);
        return await this.vAcarreosService.createAcarreo(createAcarreoDto);
    }

    @Get('acarreos')
    async findAllAcarreo(@Query() query: QueryAcarreoDto) {
        return await this.vAcarreosService.findAllAcarreo(query);
    }

    @Get('acarreos/dias')
    async findAllAcarreoDias(@Query() query: QueryAcarreoDiasDto) {
        return await this.vAcarreosService.findAllAcarreoDias(query);
    }

    @Get('acarreos/:id')
    async findOneAcarreo(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.findOneAcarreo(id);
    }

    @Patch('acarreos/:id')
    async updateAcarreo(@Param('id', ParseIntPipe) id: number, @Body() updateAcarreoDto: UpdateAcarreoDto) {
        return await this.vAcarreosService.updateAcarreo(id, updateAcarreoDto);
    }

    @Delete('acarreos/:id')
    async removeAcarreo(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.removeAcarreo(id);
    }

    /* Clientes */
    @Post('clientes')
    async createCliente(@Body() createClienteDto: CreateClienteDto) {
        return await this.vAcarreosService.createCliente(createClienteDto);
    }

    @Get('clientes')
    async findAllCliente(@Query() query: QueryClienteDto) {
        return this.vAcarreosService.findAllCliente(query);
    }

    @Get('clientes/:id')
    async findOneCliente(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.findOneCliente(id);
    }

    @Patch('clientes/:id')
    async updateCliente(@Param('id', ParseIntPipe) id: number, @Body() updateClienteDto: UpdateClienteDto) {
        return await this.vAcarreosService.updateCliente(id, updateClienteDto);
    }

    @Delete('clientes/:id')
    async removeCliente(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.removeCliente(id);
    }

    /* IEs */
    @Post('ies')
    async createIE(@Body() createIEDto: CreateIEDto) {
        return await this.vAcarreosService.createIE(createIEDto);
    }

    @Get('ies')
    async findAllIE(@Query() query: QueryIEDto) {
        return await this.vAcarreosService.findAllIE(query);
    }

    @Get('ies/:id')
    async findOneIE(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.findOneIE(id);
    }

    @Patch('ies/:id')
    async updateIE(@Param('id', ParseIntPipe) id: number, @Body() updateIEDto: UpdateIEDto) {
        return await this.vAcarreosService.updateIE(id, updateIEDto);
    }

    @Delete('ies/:id')
    async removeIE(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.removeIE(id);
    }

    /* Estados */
    @Post('estados')
    async createEstado(@Body() createEstadoDto: CreateEstadoDto) {
        return await this.vAcarreosService.createEstado(createEstadoDto);
    }

    @Get('estados')
    async findAllEstado(@Query() query: QueryEstadoDto) {
        return await this.vAcarreosService.findAllEstado(query);
    }

    @Get('estados/:id')
    async findOneEstado(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.findOneEstado(id);
    }

    @Patch('estados/:id')
    async updateEstado(@Param('id', ParseIntPipe) id: number, @Body() updateEstadoDto: UpdateEstadoDto) {
        return await this.vAcarreosService.updateEstado(id, updateEstadoDto);
    }

    @Delete('estados/:id')
    async removeEstado(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.removeEstado(id);
    }

    /* Tamaños */
    @Post('tamanios')
    async createTamanio(@Body() createTamanioDto: CreateTamanioDto) {
        return await this.vAcarreosService.createTamanio(createTamanioDto);
    }

    @Get('tamanios')
    async findAllTamanio(@Query() query: QueryTamanioDto) {
        return await this.vAcarreosService.findAllTamanio(query);
    }

    @Get('tamanios/:id')
    async findOneTamanio(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.findOneTamanio(id);
    }

    @Patch('tamanios/:id')
    async updateTamanio(@Param('id', ParseIntPipe) id: number, @Body() updateTamanioDto: UpdateTamanioDto) {
        return await this.vAcarreosService.updateTamanio(id, updateTamanioDto);
    }

    @Delete('tamanios/:id')
    async removeTamanio(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.removeTamanio(id);
    }

    /* TamañosLetra */
    @Post('tamanios/letra')
    async createTamanioLetra(@Body() createTamanioLetraDto: CreateTamanioLetraDto) {
        return await this.vAcarreosService.createTamanioLetra(createTamanioLetraDto);
    }

    @Get('tamanios/letra')
    async findAllTamanioLetra(@Query() query: QueryTamanioLetraDto) {
        return await this.vAcarreosService.findAllTamanioLetra(query);
    }

    @Get('tamanios/letra/:id')
    async findOneTamanioLetra(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.findOneTamanioLetra(id);
    }

    @Patch('tamanios/letra/:id')
    async updateTamanioLetra(@Param('id', ParseIntPipe) id: number, @Body() updateTamanioLetraDto: UpdateTamanioLetraDto) {
        return await this.vAcarreosService.updateTamanioLetra(id, updateTamanioLetraDto);
    }

    @Delete('tamanios/letra/:id')
    async removeTamanioLetra(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.removeTamanioLetra(id);
    }

    /* TamañosNum */
    @Post('tamanios/num')
    async createTamanioNum(@Body() createTamanioNumDto: CreateTamanioNumDto) {
        return await this.vAcarreosService.createTamanioNum(createTamanioNumDto);
    }

    @Get('tamanios/num')
    async findAllTamanioNum(@Query() query: QueryTamanioNumDto) {
        return await this.vAcarreosService.findAllTamanioNum(query);
    }

    @Get('tamanios/num/:id')
    async findOneTamanioNum(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.findOneTamanioNum(id);
    }

    @Patch('tamanios/num/:id')
    async updateTamanioNum(@Param('id', ParseIntPipe) id: number, @Body() updateTamanioNumDto: UpdateTamanioNumDto) {
        return await this.vAcarreosService.updateTamanioNum(id, updateTamanioNumDto);
    }

    @Delete('tamanios/num/:id')
    async removeTamanioNum(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.removeTamanioNum(id);
    }

    /* Conductores */
    @Post('conductores')
    async createConductor(@Body() createConductorDto: CreateConductorDto) {
        return await this.vAcarreosService.createConductor(createConductorDto);
    }

    @Get('conductores')
    async findAllConductor(@Query() query: QueryConductorDto) {
        return await this.vAcarreosService.findAllConductor(query);
    }

    @Get('conductores/:id')
    async findOneConductor(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.findOneConductor(id);
    }

    @Patch('conductores/:id')
    async updateConductor(@Param('id', ParseIntPipe) id: number, @Body() updateConductorDto: UpdateConductorDto) {
        return await this.vAcarreosService.updateConductor(id, updateConductorDto);
    }

    @Delete('conductores/:id')
    async removeConductor(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.removeConductor(id);
    }

    /* TipoConductores */
    @Post('conductores/tipos')
    async createTipoConductor(@Body() createConductorTipoDto: CreateConductorTipoDto) {
        return await this.vAcarreosService.createTipoConductor(createConductorTipoDto);
    }

    @Get('conductores/tipos')
    async findAllTipoConductor(@Query() query: QueryConductorTipoDto) {
        return await this.vAcarreosService.findAllTipoConductor(query);
    }

    @Get('conductores/tipos/:id')
    async findOneTipoConductor(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.findOneTipoConductor(id);
    }

    @Patch('conductores/tipos/:id')
    async updateTipoConductor(@Param('id', ParseIntPipe) id: number, @Body() updateConductorTipoDto: UpdateConductorTipoDto) {
        return await this.vAcarreosService.updateTipoConductor(id, updateConductorTipoDto);
    }

    @Delete('conductores/tipos/:id')
    async removeTipoConductor(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.removeTipoConductor(id);
    }

    /* Matriculas */
    @Post('matriculas')
    async createMatricula(@Body() createMatriculaDto: CreateMatriculaDto) {
        return await this.vAcarreosService.createMatricula(createMatriculaDto);
    }

    @Get('matriculas')
    async findAllMatricula(@Query() query: QueryMatriculaDto) {
        return await this.vAcarreosService.findAllMatricula(query);
    }

    @Get('matriculas/:id')
    async findOneMatricula(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.findOneMatricula(id);
    }

    @Patch('matriculas/:id')
    async updateMatricula(@Param('id', ParseIntPipe) id: number, @Body() updateMatriculaDto: UpdateMatriculaDto) {
        return await this.vAcarreosService.updateMatricula(id, updateMatriculaDto);
    }

    @Delete('matriculas/:id')
    async removeMatricula(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.removeMatricula(id);
    }

    /* TipoMatriculas */
    @Post('matriculas/tipos')
    async createTipoMatricula(@Body() createMatriculaTipoDto: CreateMatriculaTipoDto) {
        return await this.vAcarreosService.createTipoMatricula(createMatriculaTipoDto);
    }

    @Get('matriculas/tipos')
    async findAllTipoMatricula(@Query() query: QueryMatriculaTipoDto) {
        return await this.vAcarreosService.findAllTipoMatricula(query);
    }

    @Get('matriculas/tipos/:id')
    async findOneTipoMatricula(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.findOneTipoMatricula(id);
    }

    @Patch('matriculas/tipos/:id')
    async updateTipoMatricula(@Param('id', ParseIntPipe) id: number, @Body() updateMatriculaTipoDto: UpdateMatriculaTipoDto) {
        return await this.vAcarreosService.updateTipoMatricula(id, updateMatriculaTipoDto);
    }

    @Delete('matriculas/tipos/:id')
    async removeTipoMatricula(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.removeTipoMatricula(id);
    }

    /* Poblaciones */
    @Post('poblaciones')
    async createPoblacion(@Body() createPoblacionDto: CreatePoblacionDto) {
        return await this.vAcarreosService.createPoblacion(createPoblacionDto);
    }

    @Get('poblaciones')
    async findAllPoblacion(@Query() query: QueryPoblacionDto) {
        return await this.vAcarreosService.findAllPoblacion(query);
    }

    @Get('poblaciones/:id')
    async findOnePoblacion(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.findOnePoblacion(id);
    }

    @Patch('poblaciones/:id')
    async updatePoblacion(@Param('id', ParseIntPipe) id: number, @Body() updatePoblacionDto: UpdatePoblacionDto) {
        return await this.vAcarreosService.updatePoblacion(id, updatePoblacionDto);
    }

    @Delete('poblaciones/:id')
    async removePoblacion(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.removePoblacion(id);
    }

    /* Ordenes */
    @Post('ordenes')
    async createOrden(@Body() createOrdenDto: CreateOrdenDto) {
        return await this.vAcarreosService.createOrden(createOrdenDto);
    }

    @Get('ordenes')
    async findAllOrden(@Query() query: QueryOrdenDto) {
        return await this.vAcarreosService.findAllOrden(query);
    }

    @Get('ordenes/:id')
    async findOneOrden(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.findOneOrden(id);
    }

    @Patch('ordenes/:id')
    async updateOrden(@Param('id', ParseIntPipe) id: number, @Body() updateOrdenDto: UpdateOrdenDto) {
        return await this.vAcarreosService.updateOrden(id, updateOrdenDto);
    }

    @Delete('ordenes/:id')
    async removeOrden(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.removeOrden(id);
    }

    /* TipoIncidencias */
    @Post('incidencias/tipos')
    async createTipoIncidencias(@Body() createIncidenciaTipoDto: CreateIncidenciaTipoDto) {
        return await this.vAcarreosService.createTipoIncidencia(createIncidenciaTipoDto);
    }

    @Get('incidencias/tipos')
    async findAllTipoIncidencias(@Query() query: QueryIncidenciaTipoDto) {
        return await this.vAcarreosService.findAllTipoIncidencia(query);
    }

    @Get('incidencias/tipos/:id')
    async findOneTipoIncidencias(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.findOneTipoIncidencia(id);
    }

    @Patch('incidencias/tipos/:id')
    async updateTipoIncidencias(@Param('id', ParseIntPipe) id: number, @Body() updateIncidenciaTipoDto: UpdateIncidenciaTipoDto) {
        return await this.vAcarreosService.updateTipoIncidencia(id, updateIncidenciaTipoDto);
    }

    @Delete('incidencias/tipos/:id')
    async removeTipoIncidencias(@Param('id', ParseIntPipe) id: number) {
        return await this.vAcarreosService.removeTipoIncidencia(id);
    }
}
