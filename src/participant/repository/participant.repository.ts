import { Participant } from '../entities/participant.entity';

export abstract class ParticipantRepository {
  abstract findAll(): Promise<Participant[]>;

  abstract findOne(id: number): Promise<Participant | null>;

  abstract create(participant: Partial<Participant>): Promise<Participant>;

  abstract update(
    id: number,
    participant: Partial<Participant>,
  ): Promise<Participant | null>;

  abstract delete(id: number): Promise<void>;
}
