import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateSedeDto {
    @Allow()
    readonly __kind: 'sede' = 'sede';

    @ApiProperty({ example: 'Sede Principal', description: 'Nombre de la sede' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;
}