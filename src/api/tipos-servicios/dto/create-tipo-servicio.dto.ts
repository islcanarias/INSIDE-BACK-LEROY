import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";


export class CreateTipoServicioDto {
    @Allow()
    readonly __kind: 'tipo_servicio' = 'tipo_servicio';

    @ApiProperty({ example: 'Transporte Express', description: 'Nombre del tipo de servicio' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;

    @ApiProperty({ example: 1, description: 'ID de la sede a la que pertenece' })
    @IsInt()
    @IsNotEmpty()
    id_sede: number;

    @ApiProperty({ example: true, description: 'Activo o inactivo' })
    @IsBoolean()
    @IsOptional()
    activo?: boolean = true;
}