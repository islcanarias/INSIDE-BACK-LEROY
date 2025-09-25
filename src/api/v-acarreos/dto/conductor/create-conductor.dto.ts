import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateConductorDto {
    readonly __kind: 'conductor' = 'conductor';

    @ApiProperty({
        example: 'Mengano',
        description: 'Nombre del conductor',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombre: string;

    @ApiProperty({
        example: 1,
        description: 'Tipo de conductor (1 = interno, 2 = externo)',
        required: true,
    })
    @IsNotEmpty()
    @IsInt()
    id_tipo_conductor: number;

}