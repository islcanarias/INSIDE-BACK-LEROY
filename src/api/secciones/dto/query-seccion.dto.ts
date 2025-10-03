import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class QuerySeccionDto {
    @ApiPropertyOptional({ example: 'Sección A', description: 'Nombre de la sección' })
    @IsOptional()
    @IsString()
    nombre?: string;

    @ApiPropertyOptional({ example: 1, description: 'ID de la sede' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id_sede?: number;

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

    @ApiPropertyOptional({ example: 'nombre', description: 'Campo para ordenar. Valores permitidos: "id", "nombre", "id_sede", "activo".' })
    @IsOptional()
    @IsIn(['id', 'nombre', 'id_sede', 'activo'])
    orderBy?: string;

    @ApiPropertyOptional({ example: 'asc', description: 'Dirección del orden. Valores permitidos: "asc" o "ASC" o "desc" o "DESC".' })
    @IsOptional()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    orderDir?: string;
}