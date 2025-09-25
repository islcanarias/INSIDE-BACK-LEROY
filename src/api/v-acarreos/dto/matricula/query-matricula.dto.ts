import { IsOptional, IsInt, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryMatriculaDto {

    @ApiPropertyOptional({ example: '1234ABC', description: 'Matrícula del vehículo' })
    @IsOptional()
    matricula?: string;

    @ApiPropertyOptional({ example: 1, description: 'Tipo de matrícula (entero)' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    tipo?: number;

    @ApiPropertyOptional({ example: 1, description: 'Indica si está activo (1) o inactivo (0)' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    activo?: number;

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
