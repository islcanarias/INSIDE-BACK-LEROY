import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";


export class CreateUsuarioDto {
    @Allow()
    readonly __kind: 'usuario' = 'usuario';

    @ApiProperty({ example: 1, description: 'ID del rol asignado' })
    @IsInt()
    @IsNotEmpty()
    id_rol: number;

    @ApiProperty({ example: true, description: 'Activo o inactivo' })
    @IsBoolean()
    @IsOptional()
    activo?: boolean = true;
}
