import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { SubsedeService } from "./subsede.service";
import { CreateSubsedeDto } from "./dto/create-subsede.dto";
import { QuerySubsedeDto } from "./dto/query-subsede.dto";
import { UpdateSubsedeDto } from "./dto/update-subsede.dto";

@Controller('gestion-pedidos/subsedes')
export class SubsedeController {
    constructor(private readonly subsedeService: SubsedeService) { }

    @Post()
    async create(@Body() createDto: CreateSubsedeDto) {
        return await this.subsedeService.createSubsede(createDto);
    }

    @Get()
    async findAll(@Query() query: QuerySubsedeDto) {
        return await this.subsedeService.findAllSubsede(query);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.subsedeService.findOneSubsede(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateSubsedeDto) {
        return await this.subsedeService.updateSubsede(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.subsedeService.removeSubsede(id);
    }
}