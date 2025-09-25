import { ApiProperty } from '@nestjs/swagger';

export class ResponseEstadoDto {

    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Estado ejemplo' })
    estado: string;

    @ApiProperty({ example: '#ff5733' })
    color: string;

}
