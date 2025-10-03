import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CreateRolDto {
    @Allow()
    readonly __kind: 'rol' = 'rol';

    @ApiProperty({ example: 'Administrador', description: 'Nombre del rol' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;
}