import { ApiProperty } from '@nestjs/swagger';

export class ResponseSubTipoServicioDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Express' })
    nombre: string;
}
