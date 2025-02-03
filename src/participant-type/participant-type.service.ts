// src/participants/services/participant-type.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ParticipantType } from './entities/participant-type.entity';
import { ParticipantTypeRepository } from './repository/participant-type.repository';
import { CreateParticipantTypeDto } from './dto/create-participant-type.dto';
import { QueryFailedError } from 'typeorm';
import { KafkaProducerService } from 'src/kafka/producer/kafka-producer.service';
import { KafkaConstants } from 'src/kafka/kafka-constants';

@Injectable()
export class ParticipantTypeService {
  constructor(
    private readonly participantTypeRepository: ParticipantTypeRepository,
    private readonly kafkaProducerService: KafkaProducerService<ParticipantType>,
  ) {}

  async findAll(): Promise<ParticipantType[]> {
    return this.participantTypeRepository.findAll();
  }

  async findOne(id: number): Promise<ParticipantType | null> {
    const participantType = await this.participantTypeRepository.findOne(id);

    if (!participantType) {
      throw new NotFoundException(`Participant type with id ${id} not found`);
    }
    return participantType;
  }

  async create(
    createParticipantTypeDto: CreateParticipantTypeDto,
  ): Promise<ParticipantType> {
    try {
      const pt = await this.participantTypeRepository.create(
        createParticipantTypeDto,
      );
      await this.kafkaProducerService.publishEvent(
        KafkaConstants.TOPIC_CREATE_PARTICIPANT_TYPE,
        pt,
      );

      return pt;
    } catch (ex) {
      if (ex instanceof QueryFailedError) {
        const errorMsg = `Error: participant type (${createParticipantTypeDto.name}) already exists`;
        console.error(errorMsg);
        throw new BadRequestException(errorMsg);
      }
      throw new Error('Error creating participant type');
    }
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
