import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { SubTipoServicioService } from "./sub-tipo-servicio.service";
import { CreateSubTipoServicioDto } from "./dto/create-sub-tipo-servicio.dto";
import { QuerySubTipoServicioDto } from "./dto/query-sub-tipo-servicio.dto";
import { UpdateSubTipoServicioDto } from "./dto/update-sub-tipo-servicio.dto";

@Controller('gestion-pedidos/sub-tipos-servicios')
export class SubTipoServicioController {
    constructor(private readonly subTipoServicioService: SubTipoServicioService) { }

    @Post()
    async create(@Body() createDto: CreateSubTipoServicioDto) {
        return await this.subTipoServicioService.createSubTipoServicio(createDto);
    }

    @Get()
    async findAll(@Query() query: QuerySubTipoServicioDto) {
        return await this.subTipoServicioService.findAllSubTipoServicio(query);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.subTipoServicioService.findOneSubTipoServicio(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateSubTipoServicioDto) {
        return await this.subTipoServicioService.updateSubTipoServicio(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.subTipoServicioService.removeSubTipoServicio(id);
    }
}