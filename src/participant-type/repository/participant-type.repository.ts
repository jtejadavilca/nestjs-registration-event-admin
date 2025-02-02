import { ParticipantType } from '../entities/participant-type.entity';

export abstract class ParticipantTypeRepository {
  abstract findAll(): Promise<ParticipantType[]>;

  abstract findOne(id: number): Promise<ParticipantType | null>;

  abstract create(
    participantType: Partial<ParticipantType>,
  ): Promise<ParticipantType>;

  abstract update(
    id: number,
    participantType: Partial<ParticipantType>,
  ): Promise<ParticipantType | null>;

  abstract delete(id: number): Promise<void>;
}
