import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateIEDto {
    readonly __kind: 'ie' = 'ie';

    @ApiProperty({
        example: 'Fulano',
        description: 'Nombre del importador/exportador',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    tipo: string;

}