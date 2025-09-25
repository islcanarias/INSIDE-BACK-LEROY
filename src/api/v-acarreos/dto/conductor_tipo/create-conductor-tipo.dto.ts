import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateConductorTipoDto {
    readonly __kind: 'conductor_tipo' = 'conductor_tipo';

    @ApiProperty({
        example: 'Autónomo',
        description: 'Nombre del tipo de conductor',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    tipo: string;

}