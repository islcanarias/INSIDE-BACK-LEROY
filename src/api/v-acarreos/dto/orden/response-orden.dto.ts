import { ApiProperty } from '@nestjs/swagger';

export class ResponseOrdenDto {

    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'ALC' })
    tipo: string;

}
