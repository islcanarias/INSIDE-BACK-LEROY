import { ApiProperty } from '@nestjs/swagger';

export class ResponseIEDto {

    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'IE ejemplo' })
    tipo: string;

}
