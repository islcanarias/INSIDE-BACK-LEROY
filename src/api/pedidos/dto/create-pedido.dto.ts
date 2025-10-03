import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreatePedidoDto {
    @Allow()
    readonly __kind: 'pedido' = 'pedido';

    @ApiProperty({ example: 'BO-001', description: 'Número de boletín' })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    boletin?: string;

    @ApiProperty({ example: 10, description: 'Cantidad de unidades' })
    @IsInt()
    @IsNotEmpty()
    cantidad: number;

    @ApiProperty({ example: 'Cesión XYZ', description: 'Nombre de la cesión' })
    @IsString()
    @IsOptional()
    @MaxLength(255)
    cesion?: string;

    @ApiProperty({ example: '2025-08-25', description: 'Fecha del pedido' })
    @IsDateString()
    @IsNotEmpty()
    fecha: string;

    @ApiProperty({ example: '15:30:00', description: 'Hora del pedido' })
    @IsString()
    @IsNotEmpty()
    hora: string;

    @ApiProperty({ example: 1, description: 'ID del estado' })
    @IsInt()
    @IsNotEmpty()
    id_estado: number;

    @ApiProperty({ example: 1, description: 'ID de la referencia' })
    @IsInt()
    @IsNotEmpty()
    id_referencia: number;

    @ApiProperty({ example: 1, description: 'ID del tipo de servicio' })
    @IsInt()
    @IsNotEmpty()
    id_tipo_servicio: number;

    @ApiProperty({ example: 1, description: 'ID del usuario' })
    @IsInt()
    @IsNotEmpty()
    id_usuario: number;
}