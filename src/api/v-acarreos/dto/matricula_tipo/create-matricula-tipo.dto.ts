import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateMatriculaTipoDto {
    readonly __kind: 'matricula_tipo' = 'matricula_tipo';

    @ApiProperty({
        example: 'Acarreos',
        description: 'Nombre del tipo de matricula',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    tipo: string;


}