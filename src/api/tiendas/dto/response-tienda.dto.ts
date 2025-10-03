import { ApiProperty } from '@nestjs/swagger';

export class ResponseTiendaDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Tienda Principal' })
    nombre: string;

    @ApiProperty({ example: 1 })
    id_sede: number;

    @ApiProperty({ example: true })
    activo: boolean;
}
