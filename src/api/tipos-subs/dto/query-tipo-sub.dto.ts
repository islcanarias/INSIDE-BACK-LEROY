import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, Min } from "class-validator";

export class QueryTipoSubDto {
    @ApiPropertyOptional({ example: 1, description: 'ID del tipo de servicio' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id_tipo?: number;

    @ApiPropertyOptional({ example: 1, description: 'ID del sub tipo de servicio' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id_sub?: number;

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

    @ApiPropertyOptional({ example: 'id_tipo', description: 'Campo para ordenar. Valores permitidos: "id", "id_tipo", "id_sub".' })
    @IsOptional()
    @IsIn(['id', 'id_tipo', 'id_sub'])
    orderBy?: string;

    @ApiPropertyOptional({ example: 'asc', description: 'Dirección del orden. Valores permitidos: "asc" o "ASC" o "desc" o "DESC".' })
    @IsOptional()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    orderDir?: string;
}