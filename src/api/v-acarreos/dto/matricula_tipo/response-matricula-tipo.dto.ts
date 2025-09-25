import { ApiProperty } from '@nestjs/swagger';

export class ResponseMatriculaTipoDto {

    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Acarreos' })
    tipo: string;

}
