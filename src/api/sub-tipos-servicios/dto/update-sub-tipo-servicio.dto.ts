import { PartialType } from '@nestjs/mapped-types';
import { CreateSubTipoServicioDto } from './create-sub-tipo-servicio.dto';

export class UpdateSubTipoServicioDto extends PartialType(CreateSubTipoServicioDto) { }