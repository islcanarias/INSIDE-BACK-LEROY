import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTamanioNumDto {
    readonly __kind: 'tamanio_num' = 'tamanio_num';

    @ApiProperty({
        example: '20',
        description: 'Tipo de tamaño',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    tipo: string;

}