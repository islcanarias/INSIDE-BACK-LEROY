import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { SeccionService } from "./seccion.service";
import { CreateSeccionDto } from "./dto/create-seccion.dto";
import { QuerySeccionDto } from "./dto/query-seccion.dto";
import { UpdateSeccionDto } from "./dto/update-seccion.dto";

@Controller('gestion-pedidos/secciones')
export class SeccionController {
    constructor(private readonly seccionService: SeccionService) { }

    @Post()
    async create(@Body() createDto: CreateSeccionDto) {
        return await this.seccionService.createSeccion(createDto);
    }

    @Get()
    async findAll(@Query() query: QuerySeccionDto) {
        return await this.seccionService.findAllSeccion(query);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.seccionService.findOneSeccion(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateSeccionDto) {
        return await this.seccionService.updateSeccion(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.seccionService.removeSeccion(id);
    }
}