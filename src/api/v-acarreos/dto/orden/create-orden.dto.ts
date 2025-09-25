import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateOrdenDto {
    readonly __kind: 'orden' = 'orden';

    @ApiProperty({
        example: 'ALC',
        description: 'Orcenes de acarreo',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    tipo: string;

}