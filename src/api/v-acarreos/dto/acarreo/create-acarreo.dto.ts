import { ApiProperty } from "@nestjs/swagger";
import {
    Allow,
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
} from "class-validator";

export class CreateAcarreoDto {
    @Allow()
    readonly __kind: 'acarreo' = 'acarreo';

    @ApiProperty({
        example: 123456,
        description: 'Número de expediente Transkal',
        required: false
    })
    @IsInt()
    @IsOptional()
    expediente_transkal?: number;

    @ApiProperty({
        example: 1,
        description: 'ID del estado',
        required: true
    })
    @IsInt()
    @IsNotEmpty()
    id_estado: number;

    @ApiProperty({
        example: '2025-08-25',
        description: 'Fecha del acarreo con formato YYYY-MM-DD',
        required: true
    })
    @IsDateString()
    @IsNotEmpty()
    fecha: string;

    @ApiProperty({
        example: '15:30:00',
        description: 'Hora del acarreo con formato HH:MM:SS',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    hora: string;

    @ApiProperty({
        example: 5,
        description: 'ID del cliente',
        required: true
    })
    @IsInt()
    @IsNotEmpty()
    id_cliente: number;

    @ApiProperty({
        example: 'REF-FAC-001',
        description: 'Referencia de facturación',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    referencia_facturacion?: string;

    @ApiProperty({
        example: 'REF-INT-001',
        description: 'Referencia interna',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    referencia_interna?: string;

    @ApiProperty({
        example: 1,
        description: 'ID de Importación/Exportación (IE)',
        required: true
    })
    @IsInt()
    @IsNotEmpty()
    id_i_e: number;

    @ApiProperty({
        example: 2,
        description: 'ID del tamaño del contenedor',
        required: true
    })
    @IsInt()
    @IsNotEmpty()
    id_tamanio: number;

    @ApiProperty({
        example: 4,
        description: 'ID de la matrícula',
        required: true
    })
    @IsInt()
    @IsOptional()
    id_matricula: number;

    @ApiProperty({
        example: 10,
        description: 'ID de la población',
        required: true
    })
    @IsInt()
    @IsOptional()
    id_poblacion: number;

    @ApiProperty({
        example: 'BOOK-001',
        description: 'Código de booking',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    booking?: string;

    @ApiProperty({
        example: 'CONT-1234567',
        description: 'Número de contenedor',
        required: false
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    contenedor?: string;

    @ApiProperty({
        example: 'PREC-98765',
        description: 'Código de precinto',
        required: false
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    precinto?: string;

    @ApiProperty({
        example: 3,
        description: 'ID del conductor principal',
        required: true
    })
    @IsOptional()
    @IsInt()
    id_conductor1: number;

    @ApiProperty({
        example: 3,
        description: 'ID del conductor secundario',
        required: true
    })
    @IsOptional()
    @IsInt()
    id_conductor2: number;

    @ApiProperty({
        example: 1,
        description: 'ID del OE',
        required: true
    })
    @IsOptional()
    @IsInt()
    id_oe: number;

    @ApiProperty({
        example: 2,
        description: 'ID del OA',
        required: true
    })
    @IsOptional()
    @IsInt()
    id_oa: number;

    @ApiProperty({
        example: 'Puerto de Valencia',
        description: 'Lugar del acarreo',
        required: false
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    lugar?: string;

    @ApiProperty({
        example: 'REM-54321',
        description: 'Información del remolque',
        required: false
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    remolque?: string;

    @ApiProperty({
        example: 'REF-CARGA-001',
        description: 'Referencia de carga',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    referencia_carga?: string;

    @ApiProperty({
        example: 'Carga urgente, requiere revisión',
        description: 'Observaciones adicionales',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(1000)
    observacion?: string;

    @ApiProperty({
        example: 2,
        description: 'Tipo de incidencia',
        required: true
    })
    @IsOptional()
    @IsInt()
    id_tipo_incidencia: number;

    @ApiProperty({
        example: 'Hubo un retraso debido al tráfico',
        description: 'Incidencias durante el acarreo',
        required: false
    })
    @IsOptional()
    @IsString()
    @MaxLength(1000)
    incidencia?: string;

}
