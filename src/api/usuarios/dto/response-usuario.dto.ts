import { ApiProperty } from '@nestjs/swagger';

export class ResponseUsuarioDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 2 })
    id_rol: number;

    @ApiProperty({ example: true })
    activo: boolean;
}
