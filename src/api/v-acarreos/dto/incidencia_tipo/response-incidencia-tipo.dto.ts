import { ApiProperty } from '@nestjs/swagger';

export class ResponseIncidenciaTipoDto {

    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Tipo algo' })
    tipo: string;

}
