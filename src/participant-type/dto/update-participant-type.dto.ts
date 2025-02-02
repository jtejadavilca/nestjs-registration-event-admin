import { PartialType } from '@nestjs/mapped-types';
import { CreateParticipantTypeDto } from './create-participant-type.dto';

export class UpdateParticipantTypeDto extends PartialType(CreateParticipantTypeDto) {}
