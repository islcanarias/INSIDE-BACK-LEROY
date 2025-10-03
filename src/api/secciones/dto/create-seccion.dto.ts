import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";


export class CreateSeccionDto {
    @Allow()
    readonly __kind: 'seccion' = 'seccion';

    @ApiProperty({ example: 'Sección A', description: 'Nombre de la sección' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;

    @ApiProperty({ example: 1, description: 'ID de la sede a la que pertenece' })
    @IsInt()
    @IsNotEmpty()
    id_sede: number;

    @ApiProperty({ example: true, description: 'Activo o inactivo' })
    @IsBoolean()
    @IsOptional()
    activo?: boolean = true;
}