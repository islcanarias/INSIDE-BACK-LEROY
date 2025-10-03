import { ApiProperty } from '@nestjs/swagger';

export class ResponseSeccionDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Sección A' })
    nombre: string;

    @ApiProperty({ example: 1 })
    id_sede: number;

    @ApiProperty({ example: true })
    activo: boolean;
}
