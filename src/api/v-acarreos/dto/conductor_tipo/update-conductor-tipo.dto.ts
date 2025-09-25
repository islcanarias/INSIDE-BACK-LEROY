import { PartialType } from '@nestjs/mapped-types';
import { CreateConductorTipoDto } from './create-conductor-tipo.dto';

export class UpdateConductorTipoDto extends PartialType(CreateConductorTipoDto) { }