import { ApiProperty } from '@nestjs/swagger';

export class ResponsePoblacionDto {

    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Valencia' })
    poblacion: string;

    @ApiProperty({ example: 'Valencia' })
    provincia: string;

    @ApiProperty({ example: 'Comunidad Valenciana' })
    comunidad: string;

    @ApiProperty({ example: 39.469907 })
    latitud: number;

    @ApiProperty({ example: -0.376288 })
    longitud: number;

    @ApiProperty({ example: 12.34 })
    distanciaValencia: number;

}
