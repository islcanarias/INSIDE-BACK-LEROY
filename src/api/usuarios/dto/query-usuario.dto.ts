import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsInt, IsOptional, Min } from "class-validator";

export class QueryUsuarioDto {
    @ApiPropertyOptional({ example: 1, description: 'ID del rol asignado' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id_rol?: number;

    @ApiPropertyOptional({ example: true, description: 'Activo o inactivo' })
    @IsOptional()
    @IsBoolean()
    activo?: boolean = true;

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

    @ApiPropertyOptional({ example: 'id_rol', description: 'Campo para ordenar. Valores permitidos: "id", "id_rol", "activo".' })
    @IsOptional()
    @IsIn(['id', 'id_rol', 'activo'])
    orderBy?: string;

    @ApiPropertyOptional({ example: 'asc', description: 'Dirección del orden. Valores permitidos: "asc" o "ASC" o "desc" o "DESC".' })
    @IsOptional()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    orderDir?: string;
}