import { ApiProperty } from '@nestjs/swagger';

export class ResponseSubsedeDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Subsede Norte' })
    nombre: string;

    @ApiProperty({ example: 1 })
    id_sede: number;
}
