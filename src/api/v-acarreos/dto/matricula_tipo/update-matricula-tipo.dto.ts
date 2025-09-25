import { PartialType } from '@nestjs/mapped-types';
import { CreateMatriculaTipoDto } from './create-matricula-tipo.dto';

export class UpdateMatriculaTipoDto extends PartialType(CreateMatriculaTipoDto) { }