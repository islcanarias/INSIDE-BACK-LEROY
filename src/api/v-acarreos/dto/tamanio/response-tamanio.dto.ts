import { ApiProperty } from '@nestjs/swagger';
import { ResponseTamanioNumDto } from '../tamanio_num/response-tamanio-num.dto';
import { ResponseTamanioLetraDto } from '../tamanio_letra/response-tamanio-letra.dto';

export class ResponseTamanioDto {

    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ type: () => ResponseTamanioNumDto })
    tamanio_num: ResponseTamanioNumDto;

    @ApiProperty({ type: () => ResponseTamanioLetraDto })
    tamanio_letra: ResponseTamanioLetraDto;

}
