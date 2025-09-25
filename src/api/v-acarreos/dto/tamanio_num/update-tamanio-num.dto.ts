import { PartialType } from '@nestjs/mapped-types';
import { CreateTamanioNumDto } from './create-tamanio-num.dto';

export class UpdateTamanioNumDto extends PartialType(CreateTamanioNumDto) { }