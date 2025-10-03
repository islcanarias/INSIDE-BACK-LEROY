import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { QueryUsuarioDto } from "./dto/query-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";

@Controller('gestion-pedidos/usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @Post()
    async create(@Body() createDto: CreateUsuarioDto) {
        return await this.usuarioService.createUsuario(createDto);
    }

    @Get()
    async findAll(@Query() query: QueryUsuarioDto) {
        return await this.usuarioService.findAllUsuario(query);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.usuarioService.findOneUsuario(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateUsuarioDto) {
        return await this.usuarioService.updateUsuario(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.usuarioService.removeUsuario(id);
    }
}