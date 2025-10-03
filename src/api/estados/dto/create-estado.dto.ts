import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateEstadoDto {
    @Allow()
    readonly __kind: 'estado' = 'estado';

    @ApiProperty({ example: 'Pendiente', description: 'Nombre del estado' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;

    @ApiProperty({ example: 1, description: 'ID de la sede a la que pertenece' })
    @IsInt()
    @IsNotEmpty()
    id_sede: number;
}