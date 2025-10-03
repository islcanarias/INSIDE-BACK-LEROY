import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsInt, IsNotEmpty } from "class-validator";


export class CreatePermisoDto {
    @Allow()
    readonly __kind: 'permiso' = 'permiso';

    @ApiProperty({ example: 1, description: 'ID de la tienda' })
    @IsInt()
    @IsNotEmpty()
    id_tienda: number;

    @ApiProperty({ example: 1, description: 'ID del usuario' })
    @IsInt()
    @IsNotEmpty()
    id_usuario: number;
}