import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CreateSubsedeDto {
    @Allow()
    readonly __kind: 'subsede' = 'subsede';

    @ApiProperty({ example: 'Subsede Centro', description: 'Nombre de la subsede' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;

    @ApiProperty({ example: 1, description: 'ID de la sede a la que pertenece' })
    @IsInt()
    @IsNotEmpty()
    id_sede: number;
}