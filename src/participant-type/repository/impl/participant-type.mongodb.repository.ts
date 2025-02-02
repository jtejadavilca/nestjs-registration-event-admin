import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipantTypeRepository } from '../participant-type.repository';
import { ParticipantType } from 'src/participant-type/entities/participant-type.entity';

@Injectable()
export class ParticipantTypeMongoDbRepository
  implements ParticipantTypeRepository
{
  constructor(
    @InjectRepository(ParticipantType)
    private readonly repository: Repository<ParticipantType>,
  ) {}

  async findAll(): Promise<ParticipantType[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<ParticipantType | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(
    participantType: Partial<ParticipantType>,
  ): Promise<ParticipantType> {
    const newParticipantType = this.repository.create(participantType);
    return this.repository.save(newParticipantType);
  }

  async update(
    id: number,
    participantType: Partial<ParticipantType>,
  ): Promise<ParticipantType | null> {
    await this.repository.update(id, participantType);
    return this.repository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
