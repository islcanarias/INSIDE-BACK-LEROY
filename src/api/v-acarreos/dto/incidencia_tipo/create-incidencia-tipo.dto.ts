import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateIncidenciaTipoDto {
    readonly __kind: 'incidencia' = 'incidencia';

    @ApiProperty({
        example: 'Mengano',
        description: 'Nombre del tipo',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    tipo: string;

}