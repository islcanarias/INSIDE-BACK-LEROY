import { PartialType } from '@nestjs/mapped-types';
import { CreateIEDto } from './create-ie.dto';

export class UpdateIEDto extends PartialType(CreateIEDto) { }
