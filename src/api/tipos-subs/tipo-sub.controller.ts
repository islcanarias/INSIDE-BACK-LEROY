import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { TipoSubService } from "./tipo-sub.service";
import { UpdateTipoSubDto } from "./dto/update-tipo-sub.dto";
import { QueryTipoSubDto } from "./dto/query-tipo-sub.dto";
import { CreateTipoSubDto } from "./dto/create-tipo-sub.dto";

@Controller('gestion-pedidos/tipos-subs')
export class TipoSubController {
    constructor(private readonly tipoSubService: TipoSubService) { }

    @Post()
    async create(@Body() createDto: CreateTipoSubDto) {
        return await this.tipoSubService.createTipoSub(createDto);
    }

    @Get()
    async findAll(@Query() query: QueryTipoSubDto) {
        return await this.tipoSubService.findAllTipoSub(query);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.tipoSubService.findOneTipoSub(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateTipoSubDto) {
        return await this.tipoSubService.updateTipoSub(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.tipoSubService.removeTipoSub(id);
    }
}