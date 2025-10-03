import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsInt, IsNotEmpty } from "class-validator";


export class CreateTipoSubDto {
    @Allow()
    readonly __kind: 'tipo_sub' = 'tipo_sub';

    @ApiProperty({ example: 1, description: 'ID del tipo de servicio' })
    @IsInt()
    @IsNotEmpty()
    id_tipo: number;

    @ApiProperty({ example: 1, description: 'ID del sub tipo de servicio' })
    @IsInt()
    @IsNotEmpty()
    id_sub: number;
}
