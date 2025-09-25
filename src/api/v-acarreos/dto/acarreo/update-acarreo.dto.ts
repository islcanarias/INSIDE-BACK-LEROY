import { PartialType } from '@nestjs/mapped-types';
import { CreateAcarreoDto } from './create-acarreo.dto';

export class UpdateAcarreoDto extends PartialType(CreateAcarreoDto) { }