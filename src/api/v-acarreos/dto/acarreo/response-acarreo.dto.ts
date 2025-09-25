import { ApiProperty } from '@nestjs/swagger';
import { ResponseEstadoDto } from '../estado/response-estado.dto';
import { ResponseClienteDto } from '../cliente/response-cliente.dto';
import { ResponseIEDto } from '../ie/response-ie.dto';
import { ResponseTamanioDto } from '../tamanio/response-tamanio.dto';
import { ResponseMatriculaDto } from '../matricula/response-matricula.dto';
import { ResponsePoblacionDto } from '../poblacion/response-poblacion.dto';
import { ResponseConductorDto } from '../conductor/response-conductor.dto';
import { ResponseOrdenDto } from '../orden/response-orden.dto';
import { ResponseIncidenciaTipoDto } from '../incidencia_tipo/response-incidencia-tipo.dto';

export class ResponseAcarreoDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 123456 })
    expediente_transkal: number;

    @ApiProperty({ type: () => ResponseEstadoDto })
    estado: ResponseEstadoDto;

    @ApiProperty({ example: '2025-08-14' })
    fecha: string;

    @ApiProperty({ example: '15:30:00' })
    hora: string;

    @ApiProperty({ type: () => ResponseClienteDto })
    cliente: ResponseClienteDto;

    @ApiProperty({ example: 'FAC-2025-001' })
    referencia_facturacion: string;

    @ApiProperty({ example: 'INT-98765' })
    referencia_interna: string;

    @ApiProperty({ type: () => ResponseIEDto })
    i_e: ResponseIEDto;

    @ApiProperty({ type: () => ResponseTamanioDto })
    tamanio: ResponseTamanioDto;

    @ApiProperty({ type: () => ResponseMatriculaDto })
    matricula: ResponseMatriculaDto;

    @ApiProperty({ type: () => ResponsePoblacionDto })
    poblacion: ResponsePoblacionDto;

    @ApiProperty({ example: 'BOOK-12345' })
    booking: string;

    @ApiProperty({ example: 'CONT-9876543' })
    contenedor: string;

    @ApiProperty({ example: 'PREC-54321' })
    precinto: string;

    @ApiProperty({ type: () => ResponseConductorDto })
    conductor1: ResponseConductorDto;

    @ApiProperty({ type: () => ResponseConductorDto })
    conductor2: ResponseConductorDto;

    @ApiProperty({ type: () => ResponseOrdenDto })
    oe: ResponseOrdenDto;

    @ApiProperty({ type: () => ResponseOrdenDto })
    oa: ResponseOrdenDto;

    @ApiProperty({ example: 'Puerto de Valencia' })
    lugar: string;

    @ApiProperty({ example: 'REM-001' })
    remolque: string;

    @ApiProperty({ example: 'REF-CARGA-2025' })
    referencia_carga: string;

    @ApiProperty({ example: 'Sin incidencias' })
    observacion: string;

    @ApiProperty({ type: () => ResponseIncidenciaTipoDto })
    incidenciaTipo: ResponseIncidenciaTipoDto;

    @ApiProperty({ example: 'Ninguna' })
    incidenciaDetalle: string;

}

export class ResponseAcarreoDiasDto {
    @ApiProperty({ example: ['2025-09-01', '2025-09-05', '2025-09-17'], description: 'Fechas del mes que tienen acarreos' })
    fechas: string[];
}
