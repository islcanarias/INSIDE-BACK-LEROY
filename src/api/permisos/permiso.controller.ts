import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { PermisoService } from "./permiso.service";
import { CreatePermisoDto } from "./dto/create-permiso.dto";
import { QueryPermisoDto } from "./dto/query-permiso.dto";
import { UpdatePermisoDto } from "./dto/update-permiso.dto";

@Controller('gestion-pedidos/permisos')
export class PermisoController {
    constructor(private readonly permisoService: PermisoService) { }

    @Post()
    async create(@Body() createDto: CreatePermisoDto) {
        return await this.permisoService.createPermiso(createDto);
    }

    @Get()
    async findAll(@Query() query: QueryPermisoDto) {
        return await this.permisoService.findAllPermiso(query);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.permisoService.findOnePermiso(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdatePermisoDto) {
        return await this.permisoService.updatePermiso(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.permisoService.removePermiso(id);
    }
}