import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateParticipantTypeDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  description: string;
}
