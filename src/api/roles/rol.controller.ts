import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { CreateRolDto } from "./dto/create-rol.dto";
import { QueryRolDto } from "./dto/query-rol.dto";
import { RolService } from "./rol.service";
import { UpdateRolDto } from "./dto/update-rol.dto";

@Controller('gestion-pedidos/roles')
export class RolController {
    constructor(private readonly rolService: RolService) { }

    @Post()
    async create(@Body() createDto: CreateRolDto) {
        return await this.rolService.createRol(createDto);
    }

    @Get()
    async findAll(@Query() query: QueryRolDto) {
        return await this.rolService.findAllRol(query);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.rolService.findOneRol(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateRolDto) {
        return await this.rolService.updateRol(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.rolService.removeRol(id);
    }
}