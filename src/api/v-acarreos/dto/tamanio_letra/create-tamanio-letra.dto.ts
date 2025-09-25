import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTamanioLetraDto {
    readonly __kind: 'tamanio_letra' = 'tamanio_letra';

    @ApiProperty({
        example: 'OT',
        description: 'Tipo de tamaño',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    tipo: string;


}