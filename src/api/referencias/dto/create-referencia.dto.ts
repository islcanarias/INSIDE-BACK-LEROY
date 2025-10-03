import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";


export class CreateReferenciaDto {
    @Allow()
    readonly __kind: 'referencia' = 'referencia';

    @ApiProperty({ example: 'REF-001', description: 'Código de referencia' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    referencia: string;

    @ApiProperty({ example: 'Descripción de la referencia', description: 'Descripción' })
    @IsString()
    @IsOptional()
    @MaxLength(255)
    descripcion?: string;

    @ApiProperty({ example: '1234567890123', description: 'Código EAN' })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    ean?: string;

    @ApiProperty({ example: true, description: 'Activo o inactivo' })
    @IsBoolean()
    @IsOptional()
    activo?: boolean = true;

    @ApiProperty({ example: 1, description: 'ID de la sección' })
    @IsInt()
    @IsNotEmpty()
    id_seccion: number;

    @ApiProperty({ example: 1, description: 'ID de la tienda' })
    @IsInt()
    @IsNotEmpty()
    id_tienda: number;
}
