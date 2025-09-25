import { IsOptional, IsInt, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryPoblacionDto {
    @ApiPropertyOptional({ example: 'Valencia', description: 'Nombre de la población' })
    @IsOptional()
    poblacion?: string;

    @ApiPropertyOptional({ example: 'Valencia', description: 'Nombre de la provincia' })
    @IsOptional()
    provincia?: string;

    @ApiPropertyOptional({ example: 'Comunidad Valenciana', description: 'Nombre de la comunidad autónoma' })
    @IsOptional()
    comunidad?: string;

    @ApiPropertyOptional({ example: 25, description: 'Distancia a Valencia en kilómetros' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    distanciaValencia?: number;

    @ApiPropertyOptional({ example: 1, description: 'Número de página (empieza en 1)' })
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

    @ApiPropertyOptional({ example: 'nombre', description: 'Campo para ordenar. Valores permitidos: "id", "nombre", "pagina", "subdominio", "descripcion".' })
    @IsOptional()
    @IsIn(['id', 'nombre', 'pagina', 'subdominio', 'descripcion'])
    orderBy?: string;

    @ApiPropertyOptional({ example: 'asc', description: 'Dirección del orden. Valores permitidos: "asc" o "ASC" o "desc" o "DESC".' })
    @IsOptional()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    orderDir?: string;

}
