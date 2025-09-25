import { PartialType } from '@nestjs/mapped-types';
import { CreateIncidenciaTipoDto } from './create-incidencia-tipo.dto';

export class UpdateIncidenciaTipoDto extends PartialType(CreateIncidenciaTipoDto) { }
