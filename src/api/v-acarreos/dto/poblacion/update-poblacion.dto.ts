import { PartialType } from '@nestjs/mapped-types';
import { CreatePoblacionDto } from './create-poblacion.dto';

export class UpdatePoblacionDto extends PartialType(CreatePoblacionDto) { }