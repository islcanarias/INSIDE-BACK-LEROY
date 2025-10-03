import { ApiProperty } from '@nestjs/swagger';

export class ResponseTipoSubDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 2 })
    id_tipo: number;

    @ApiProperty({ example: 3 })
    id_sub: number;
}
