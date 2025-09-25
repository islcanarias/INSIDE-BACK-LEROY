import { ApiProperty } from '@nestjs/swagger';
import { ResponseConductorTipoDto } from '../conductor_tipo/response-conductor-tipo.dto';

export class ResponseConductorDto {

    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Cliente Ejemplo' })
    nombre: string;

    @ApiProperty({ type: () => ResponseConductorTipoDto })
    tipo: ResponseConductorTipoDto;


}
