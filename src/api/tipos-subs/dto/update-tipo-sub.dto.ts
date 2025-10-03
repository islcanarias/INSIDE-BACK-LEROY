import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoSubDto } from './create-tipo-sub.dto';

export class UpdateTipoSubDto extends PartialType(CreateTipoSubDto) { }