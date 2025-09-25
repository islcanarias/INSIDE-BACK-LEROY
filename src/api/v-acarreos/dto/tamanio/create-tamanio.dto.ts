import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateTamanioDto {
    readonly __kind: 'tamanio' = 'tamanio';

    @ApiProperty({
        example: 1,
        description: 'Tipo de numero',
        required: true,
    })
    @IsNotEmpty()
    @IsInt()
    id_tamanio_num: number;

    @ApiProperty({
        example: 1,
        description: 'Tipo de letra',
        required: true,
    })
    @IsNotEmpty()
    @IsInt()
    id_tamanio_letra: number;
}