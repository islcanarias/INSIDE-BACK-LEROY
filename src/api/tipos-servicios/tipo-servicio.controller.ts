import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { TipoServicioService } from "./tipo-servicio.service";
import { CreateTipoServicioDto } from "./dto/create-tipo-servicio.dto";
import { QueryTipoServicioDto } from "./dto/query-tipo-servicio.dto";
import { UpdateTipoServicioDto } from "./dto/update-tipo-servicio.dto";

@Controller('gestion-pedidos/tipos-servicios')
export class TipoServicioController {
    constructor(private readonly tipoServicioService: TipoServicioService) { }

    @Post()
    async create(@Body() createDto: CreateTipoServicioDto) {
        return await this.tipoServicioService.createTipoServicio(createDto);
    }

    @Get()
    async findAll(@Query() query: QueryTipoServicioDto) {
        return await this.tipoServicioService.findAllTipoServicio(query);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.tipoServicioService.findOneTipoServicio(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateTipoServicioDto) {
        return await this.tipoServicioService.updateTipoServicio(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.tipoServicioService.removeTipoServicio(id);
    }
}