import { ApiProperty } from '@nestjs/swagger';

export class ResponseReferenciaDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'REF123' })
    referencia: string;

    @ApiProperty({ example: 'Producto de ejemplo' })
    descripcion: string;

    @ApiProperty({ example: '1234567890123' })
    ean: string;

    @ApiProperty({ example: true })
    activo: boolean;

    @ApiProperty({ example: 1 })
    id_seccion: number;

    @ApiProperty({ example: 1 })
    id_tienda: number;
}
