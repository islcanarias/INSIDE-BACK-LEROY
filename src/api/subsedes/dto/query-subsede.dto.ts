import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class QuerySubsedeDto {
    @ApiPropertyOptional({ example: 'Subsede Centro', description: 'Nombre de la subsede' })
    @IsOptional()
    @IsString()
    nombre?: string;

    @ApiPropertyOptional({ example: 1, description: 'ID de la sede' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id_sede?: number;

    @ApiPropertyOptional({ example: 1, description: 'Número de página' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ example: 10, description: 'Cantidad de elementos por página' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    pageSize?: number = 10;

    @ApiPropertyOptional({ example: 'nombre', description: 'Campo para ordenar. Valores permitidos: "id", "nombre", "id_sede".' })
    @IsOptional()
    @IsIn(['id', 'nombre', 'id_sede'])
    orderBy?: string;

    @ApiPropertyOptional({ example: 'asc', description: 'Dirección del orden. Valores permitidos: "asc" o "ASC" o "desc" o "DESC".' })
    @IsOptional()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    orderDir?: string;
}