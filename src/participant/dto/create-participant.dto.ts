import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateParticipantDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @MaxLength(255)
  phone: string;

  participantTypeId: number;
}
