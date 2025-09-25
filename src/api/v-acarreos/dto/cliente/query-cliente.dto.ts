import { IsOptional, IsInt, Min, IsIn, IsString, MaxLength, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryClienteDto {

    @ApiPropertyOptional({ example: 'Juan', description: 'Nombre del cliente para filtrar' })
    @IsOptional()
    nombre?: string;

    @ApiPropertyOptional({ example: '#ff5733', description: 'Color del cliente para filtrar' })
    @IsOptional()
    @IsString()
    @Length(9)
    color?: string;

    @ApiPropertyOptional({ example: 1, description: 'Estado de activo (1 = activo, 0 = inactivo)' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsIn([0, 1])
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

    @ApiPropertyOptional({ example: 'nombre', description: 'Campo para ordenar. Valores permitidos: "nombre", "activo".' })
    @IsOptional()
    @IsIn(['nombre', 'activo'])
    orderBy?: string;

    @ApiPropertyOptional({ example: 'asc', description: 'Dirección del orden. Valores permitidos: "asc" o "ASC" o "desc" o "DESC".' })
    @IsOptional()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    orderDir?: string;

}
