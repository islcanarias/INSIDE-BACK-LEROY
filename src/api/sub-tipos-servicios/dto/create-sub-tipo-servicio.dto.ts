import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CreateSubTipoServicioDto {
    @Allow()
    readonly __kind: 'sub_tipo_servicio' = 'sub_tipo_servicio';

    @ApiProperty({ example: 'Carga Pesada', description: 'Nombre del sub tipo de servicio' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;
}
