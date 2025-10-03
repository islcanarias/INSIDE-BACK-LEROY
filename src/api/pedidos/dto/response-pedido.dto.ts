import { ApiProperty } from '@nestjs/swagger';

export class ResponsePedidoDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'BOL-2025-01' })
    boletin: string;

    @ApiProperty({ example: 50 })
    cantidad: number;

    @ApiProperty({ example: 'Cesión temporal' })
    cesion: string;

    @ApiProperty({ example: '2025-10-03' })
    fecha: string;

    @ApiProperty({ example: '14:30:00' })
    hora: string;

    @ApiProperty({ example: 1 })
    id_estado: number;

    @ApiProperty({ example: 2 })
    id_referencia: number;

    @ApiProperty({ example: 3 })
    id_tipo_servicio: number;

    @ApiProperty({ example: 4 })
    id_usuario: number;
}
