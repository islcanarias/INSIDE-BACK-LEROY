import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { SedeService } from "./sede.service";
import { CreateSedeDto } from "./dto/create-sede.dto";
import { QuerySedeDto } from "./dto/query-sede.dto";
import { UpdateSedeDto } from "./dto/update-sede.dto";

@Controller('gestion-pedidos/sedes')
export class SedeController {
    constructor(private readonly sedeService: SedeService) { }

    @Post()
    async create(@Body() createDto: CreateSedeDto) {
        return await this.sedeService.createSede(createDto);
    }

    @Get()
    async findAll(@Query() query: QuerySedeDto) {
        return await this.sedeService.findAllSede(query);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.sedeService.findOneSede(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateSedeDto) {
        return await this.sedeService.updateSede(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.sedeService.removeSede(id);
    }
}
