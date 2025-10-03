import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";


export class CreateTiendaDto {
    @Allow()
    readonly __kind: 'tienda' = 'tienda';

    @ApiProperty({ example: 'Tienda Centro', description: 'Nombre de la tienda' })
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