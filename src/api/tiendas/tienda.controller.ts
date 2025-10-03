import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { TiendaService } from "./tienda.service";
import { CreateTiendaDto } from "./dto/create-tienda.dto";
import { QueryTiendaDto } from "./dto/query-tienda.dto";
import { UpdateTiendaDto } from "./dto/update-tienda.dto";

@Controller('gestion-pedidos/tiendas')
export class TiendaController {
    constructor(private readonly tiendaService: TiendaService) { }

    @Post()
    async create(@Body() createDto: CreateTiendaDto) {
        return await this.tiendaService.createTienda(createDto);
    }

    @Get()
    async findAll(@Query() query: QueryTiendaDto) {
        return await this.tiendaService.findAllTienda(query);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.tiendaService.findOneTienda(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateTiendaDto) {
        return await this.tiendaService.updateTienda(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.tiendaService.removeTienda(id);
    }
}