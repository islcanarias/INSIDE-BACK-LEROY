import { ApiProperty } from '@nestjs/swagger';

export class ResponseRolDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Administrador' })
    nombre: string;
}
