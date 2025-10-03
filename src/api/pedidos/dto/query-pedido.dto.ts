import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class QueryPedidoDto {
    @ApiPropertyOptional({ example: 'BO-001', description: 'Número de boletín' })
    @IsOptional()
    @IsString()
    boletin?: string;

    @ApiPropertyOptional({ example: '2025-08-25', description: 'Fecha del pedido' })
    @IsOptional()
    @IsString()
    fecha?: string;

    @ApiPropertyOptional({ example: '15:30:00', description: 'Hora del pedido' })
    @IsOptional()
    @IsString()
    hora?: string;

    @ApiPropertyOptional({ example: 1, description: 'ID del estado' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id_estado?: number;

    @ApiPropertyOptional({ example: 1, description: 'ID de la referencia' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id_referencia?: number;

    @ApiPropertyOptional({ example: 1, description: 'ID del tipo de servicio' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id_tipo_servicio?: number;

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

    @ApiPropertyOptional({ example: 'fecha', description: 'Campo para ordenar. Valores permitidos: "id", "boletin", "cantidad", "cesion", "fecha", "hora", "id_estado", "id_referencia", "id_tipo_servicio", "id_usuario".' })
    @IsOptional()
    @IsIn(['id', 'boletin', 'cantidad', 'cesion', 'fecha', 'hora', 'id_estado', 'id_referencia', 'id_tipo_servicio', 'id_usuario'])
    orderBy?: string;

    @ApiPropertyOptional({ example: 'asc', description: 'Dirección del orden. Valores permitidos: "asc" o "ASC" o "desc" o "DESC".' })
    @IsOptional()
    @IsIn(['asc', 'desc', 'ASC', 'DESC'])
    orderDir?: string;
}
