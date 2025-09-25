import { ApiProperty } from '@nestjs/swagger';
import { ResponseMatriculaTipoDto } from '../matricula_tipo/response-matricula-tipo.dto';

export class ResponseMatriculaDto {

    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Cliente Ejemplo' })
    matricula: string;

    @ApiProperty({ type: () => ResponseMatriculaTipoDto })
    tipo: ResponseMatriculaTipoDto;

}
