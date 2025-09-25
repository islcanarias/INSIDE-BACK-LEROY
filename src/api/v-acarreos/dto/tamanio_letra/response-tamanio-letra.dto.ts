import { ApiProperty } from '@nestjs/swagger';

export class ResponseTamanioLetraDto {

    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'OT' })
    tipo: string;
}
