import { ApiProperty } from '@nestjs/swagger';

export class ResponseTamanioNumDto {

    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: '20' })
    tipo: string;

}
