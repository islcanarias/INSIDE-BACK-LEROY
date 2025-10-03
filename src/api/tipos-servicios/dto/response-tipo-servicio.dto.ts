import { ApiProperty } from '@nestjs/swagger';

export class ResponseTipoServicioDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Transporte' })
    nombre: string;

    @ApiProperty({ example: 1 })
    id_sede: number;

    @ApiProperty({ example: true })
    activo: boolean;
}
