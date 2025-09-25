import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Length, Matches, MaxLength } from "class-validator";

export class CreateClienteDto {
    readonly __kind: 'cliente' = 'cliente';

    @ApiProperty({
        example: 'Fulano',
        description: 'Nombre del cliente',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombre: string;

    @ApiProperty({
        example: '#ffffffff',
        description: 'Color del cliente en formato #rrggbbaa (9 caracteres)',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Length(9, 9, { message: 'El color debe tener exactamente 9 caracteres (#rrggbbaa)' })
    @Matches(/^#[0-9a-fA-F]{8}$/, { message: 'El color debe estar en formato #rrggbbaa' })
    color?: string;

}