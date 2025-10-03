import { ApiProperty } from '@nestjs/swagger';

export class ResponseSedeDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Sede Central' })
    nombre: string;
}
