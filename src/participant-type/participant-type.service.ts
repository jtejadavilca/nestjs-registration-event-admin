// src/participants/services/participant-type.service.ts
import { Injectable } from '@nestjs/common';
import { ParticipantType } from './entities/participant-type.entity';
import { ParticipantTypeRepository } from './repository/participant-type.repository';

@Injectable()
export class ParticipantTypeService {
  constructor(
    private readonly participantTypeRepository: ParticipantTypeRepository,
  ) {}

  async findAll(): Promise<ParticipantType[]> {
    return this.participantTypeRepository.findAll();
  }

  async findOne(id: number): Promise<ParticipantType | null> {
    return this.participantTypeRepository.findOne(id);
  }

  async create(
    participantType: Partial<ParticipantType>,
  ): Promise<ParticipantType> {
    return this.participantTypeRepository.create(participantType);
  }

  async update(
    id: number,
    participantType: Partial<ParticipantType>,
  ): Promise<ParticipantType | null> {
    return this.participantTypeRepository.update(id, participantType);
  }

  async delete(id: number): Promise<void> {
    return this.participantTypeRepository.delete(id);
  }
}
