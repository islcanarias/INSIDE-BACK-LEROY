import { ApiProperty } from '@nestjs/swagger';

export class ResponseEstadoDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Pendiente' })
    nombre: string;

    @ApiProperty({ example: 1 })
    id_sede: number;
}
