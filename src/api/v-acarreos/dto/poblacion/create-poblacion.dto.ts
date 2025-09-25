import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreatePoblacionDto {
    readonly __kind: 'poblacion' = 'poblacion';

    @ApiProperty({
        example: 'Valencia',
        description: 'Nombre de la población',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    poblacion: string;

    @ApiProperty({
        example: 'Valencia',
        description: 'Provincia a la que pertenece la población',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    provincia: string;

    @ApiProperty({
        example: 'Comunidad Valenciana',
        description: 'Comunidad autónoma a la que pertenece la población',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    comunidad: string;

    @ApiProperty({
        example: 39.469907,
        description: 'Latitud de la población',
        required: true,
    })
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 7 })
    latitud: number;

    @ApiProperty({
        example: -0.376288,
        description: 'Longitud de la población',
        required: true,
    })
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 7 })
    longitud: number;

    @ApiProperty({
        example: 12.34,
        description: 'Distancia a Valencia en km',
        required: true,
    })
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    distanciaValencia: number;
}