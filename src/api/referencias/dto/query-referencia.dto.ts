import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class QueryReferenciaDto {
    @ApiPropertyOptional({ example: 'REF-001', description: 'Código de referencia' })
    @IsOptional()
    @IsString()
    referencia?: string;

    @ApiPropertyOptional({ example: 'Descripción de la referencia', description: 'Descripción' })
    @IsOptional()
    @IsString()
    descripcion?: string;

    @ApiPropertyOptional({ example: '1234567890123', description: 'Código EAN' })
    @IsOptional()
    @IsString()
    ean?: string;

    @ApiPropertyOptional({ example: true, description: 'Activo o inactivo' })
    @IsOptional()
    @IsBoolean()
    activo?: boolean = true;

    @ApiPropertyOptional({ example: 1, description: 'ID de la sección' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id_seccion?: number;

    @ApiPropertyOptional({ example: 1, description: 'ID de la tienda' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id_tienda?: number;

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

    @ApiPropertyOptional({ example: 'referencia', description: 'Campo para ordenar. Valores permitidos: "id", "referencia", "descripcion", "ean", "activo", "id_seccion", "id_tienda".' })
    @IsOptional()
    @IsIn(['id', 'referencia', 'descripcion', 'ean', 'activo', 'id_seccion', 'id_tienda'])
    orderBy?: string;

    @ApiPropertyOptional({ example: 'asc', description: 'Dirección del orden. Valores permitidos: "asc" o "ASC" o "desc" o "DESC".' })
    @IsOptional()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    orderDir?: string;
}