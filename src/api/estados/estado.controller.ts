import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { CreateEstadoDto } from "./dto/create-estado.dto";
import { QueryEstadoDto } from "./dto/query-estado.dto";
import { UpdateEstadoDto } from "./dto/update-estado.dto";
import { EstadoService } from "./estado.service";

@Controller('gestion-pedidos/estados')
export class EstadoController {
    constructor(private readonly estadoService: EstadoService) { }

    @Post()
    async create(@Body() createDto: CreateEstadoDto) {
        return await this.estadoService.createEstado(createDto);
    }

    @Get()
    async findAll(@Query() query: QueryEstadoDto) {
        return await this.estadoService.findAllEstado(query);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.estadoService.findOneEstado(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateEstadoDto) {
        return await this.estadoService.updateEstado(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.estadoService.removeEstado(id);
    }
}