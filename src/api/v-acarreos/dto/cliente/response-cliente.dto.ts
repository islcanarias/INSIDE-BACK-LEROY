import { ApiProperty } from '@nestjs/swagger';

export class ResponseClienteDto {

    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Cliente Ejemplo' })
    nombre: string;

    @ApiProperty({ example: '#ff5733' })
    color: string;

}
