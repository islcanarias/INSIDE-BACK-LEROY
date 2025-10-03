import { ApiProperty } from '@nestjs/swagger';

export class ResponsePermisoDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 2 })
    id_tienda: number;

    @ApiProperty({ example: 3 })
    id_usuario: number;
}
