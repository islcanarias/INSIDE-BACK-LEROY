import { IsOptional, IsString, IsInt, Min, Max, IsIn, MaxLength, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryAcarreoDto {

    @ApiPropertyOptional({ example: '123456', description: 'Expediente Transkal del acarreo' })
    @IsOptional()
    @IsString()
    expediente_transkal?: string;

    @ApiPropertyOptional({ example: 'Cliente XYZ', description: 'Nombre del cliente' })
    @IsOptional()
    @IsString()
    cliente?: string;

    @ApiPropertyOptional({ example: 'Importación', description: 'Tipo IE (Importación/Exportación)' })
    @IsOptional()
    @IsString()
    ie?: string;

    @ApiPropertyOptional({ example: '40FT', description: 'Tamaño del contenedor (número y letra combinados, ej. 40FT)' })
    @IsOptional()
    @IsString()
    tamanio?: string;

    @ApiPropertyOptional({ example: '40FT', description: 'Tamaño del contenedor (número y letra combinados, ej. 40FT)' })
    @IsOptional()
    @IsString()
    matricula?: string;

    @ApiPropertyOptional({ example: '40FT', description: 'Tamaño del contenedor (número y letra combinados, ej. 40FT)' })
    @IsOptional()
    @IsString()
    conductor1?: string;

    @ApiPropertyOptional({ example: 'REF-FAC-001', description: 'Referencia de facturación' })
    @IsOptional()
    @IsString()
    referencia_facturacion?: string;

    @ApiPropertyOptional({ example: 'REF-INT-001', description: 'Referencia interna' })
    @IsOptional()
    @IsString()
    referencia_interna?: string;

    @ApiPropertyOptional({ example: 'BOOK-001', description: 'Código de booking' })
    @IsOptional()
    @IsString()
    booking?: string;

    @ApiPropertyOptional({ example: 'CONT-987654', description: 'Código de contenedor' })
    @IsOptional()
    @IsString()
    contenedor?: string;

    @ApiPropertyOptional({ example: 'PREC-98765', description: 'Código de precinto' })
    @IsOptional()
    @IsString()
    precinto?: string;

    @ApiPropertyOptional({ example: '2025-08-14', description: 'Fecha de los transportes para filtrar los acarreos' })
    @IsOptional()
    @IsString()
    fecha?: string;

    @ApiPropertyOptional({ example: 12, description: 'Número de la semana en el año (1-53)' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(53)
    semana?: number;

    @ApiPropertyOptional({ example: 5, description: 'Número del mes (1-12)' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(12)
    mes?: number;

    @ApiPropertyOptional({ example: 2025, description: 'Año de referencia para filtros de fecha' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    anio?: number;

    @ApiPropertyOptional({ example: 'Pendiente', description: 'Estado del acarreo' })
    @IsOptional()
    @IsString()
    estado?: string;

    @ApiPropertyOptional({ example: 1, description: 'Filtrar acarreos activos (1) o inactivos (0)' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsIn([0, 1])
    activo?: number = 1;

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

    @ApiPropertyOptional({ example: 'fecha', description: 'Campo por el que se ordena la consulta' })
    @IsOptional()
    @IsIn([
        'id',
        'expediente_transkal',
        'cliente',
        'ie',
        'tamanio',
        'referencia_facturacion',
        'referencia_interna',
        'booking',
        'contenedor',
        'precinto',
        'estado',
        'fecha',
        'matricula',
        'conductor1',
    ])
    orderBy?: string;

    @ApiPropertyOptional({ example: 'asc', description: 'Dirección de orden: asc o desc' })
    @IsOptional()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    orderDir?: string;
}


export class QueryAcarreoDiasDto {
    @ApiPropertyOptional({
        example: 5,
        description: 'Número del mes (1-12)',
        required: true
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(12)
    mes?: number;

    @ApiPropertyOptional({
        example: 2023,
        description: 'Número del año (YYYY)',
        required: true
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    anio?: number;
}