import { PartialType } from '@nestjs/mapped-types';
import { CreateTamanioLetraDto } from './create-tamanio-letra.dto';

export class UpdateTamanioLetraDto extends PartialType(CreateTamanioLetraDto) { }