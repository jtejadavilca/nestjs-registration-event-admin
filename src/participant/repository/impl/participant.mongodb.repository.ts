import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ParticipantRepository } from '../participant.repository';
import { Participant } from 'src/participant/entities/participant.entity';

@Injectable()
export class ParticipantMongoDbRepository implements ParticipantRepository {
  constructor(
    @InjectRepository(Participant)
    private readonly repository: Repository<Participant>,
  ) {}

  async findAll(): Promise<Participant[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Participant | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(participant: Partial<Participant>): Promise<Participant> {
    const newParticipant = this.repository.create(participant);
    return this.repository.save(newParticipant);
  }

  async update(
    id: number,
    participant: Partial<Participant>,
  ): Promise<Participant | null> {
    await this.repository.update(id, participant);
    return this.repository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
