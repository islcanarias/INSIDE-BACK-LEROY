import { ApiProperty } from '@nestjs/swagger';

export class ResponseConductorTipoDto {

    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Tipo algo' })
    tipo: string;

}
