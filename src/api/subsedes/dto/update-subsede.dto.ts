import { PartialType } from '@nestjs/mapped-types';
import { CreateSubsedeDto } from './create-subsede.dto';

export class UpdateSubsedeDto extends PartialType(CreateSubsedeDto) { }