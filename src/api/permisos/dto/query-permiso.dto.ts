import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, Min } from "class-validator";

export class QueryPermisoDto {
    @ApiPropertyOptional({ example: 1, description: 'ID de la tienda' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id_tienda?: number;

    @ApiPropertyOptional({ example: 1, description: 'ID del usuario' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id_usuario?: number;

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

    @ApiPropertyOptional({ example: 'id_usuario', description: 'Campo para ordenar. Valores permitidos: "id", "id_tienda", "id_usuario".' })
    @IsOptional()
    @IsIn(['id', 'id_tienda', 'id_usuario'])
    orderBy?: string;

    @ApiPropertyOptional({ example: 'asc', description: 'Dirección del orden. Valores permitidos: "asc" o "ASC" o "desc" o "DESC".' })
    @IsOptional()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    orderDir?: string;
}