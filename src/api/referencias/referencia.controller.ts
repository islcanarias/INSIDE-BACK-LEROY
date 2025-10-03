import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { ReferenciaService } from "./referencia.service";
import { CreateReferenciaDto } from "./dto/create-referencia.dto";
import { QueryReferenciaDto } from "./dto/query-referencia.dto";
import { UpdateReferenciaDto } from "./dto/update-referencia.dto";

@Controller('gestion-pedidos/referencias')
export class ReferenciaController {
    constructor(private readonly referenciaService: ReferenciaService) { }

    @Post()
    async create(@Body() createDto: CreateReferenciaDto) {
        return await this.referenciaService.createReferencia(createDto);
    }

    @Get()
    async findAll(@Query() query: QueryReferenciaDto) {
        return await this.referenciaService.findAllReferencia(query);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.referenciaService.findOneReferencia(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateReferenciaDto) {
        return await this.referenciaService.updateReferencia(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.referenciaService.removeReferencia(id);
    }
}