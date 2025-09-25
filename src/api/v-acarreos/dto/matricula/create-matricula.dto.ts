import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateMatriculaDto {
    readonly __kind: 'matricula' = 'matricula';

    @ApiProperty({
        example: '1234ABC',
        description: 'Numeración de la matrícula',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    matricula: string;

    @ApiProperty({
        example: 1,
        description: 'Tipo de matricula',
        required: true,
    })
    @IsNotEmpty()
    @IsInt()
    id_tipo_matricula: number;
}