import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParticipantRepository } from './repository/participant.repository';
import { Participant } from './entities/participant.entity';
import { QueryFailedError } from 'typeorm';
import { KafkaConstants } from 'src/kafka/kafka-constants';
import { KafkaProducerService } from 'src/kafka/producer/kafka-producer.service';

@Injectable()
export class ParticipantService {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly kafkaProducerService: KafkaProducerService<Participant>,
  ) {}

  async findAll(): Promise<Participant[]> {
    return this.participantRepository.findAll();
  }

  async findOne(id: number): Promise<Participant> {
    const participant = await this.participantRepository.findOne(id);
    if (!participant) {
      throw new NotFoundException(`Participant with id ${id} not found`);
    }
    return participant;
  }

  async create(
    createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    try {
      const part =
        await this.participantRepository.create(createParticipantDto);
      await this.kafkaProducerService.publishEvent(
        KafkaConstants.TOPIC_CREATE_PARTICIPANT,
        part,
      );
      return part;
    } catch (ex) {
      if (ex instanceof QueryFailedError) {
        const errorMsg = `Error: participant with email (${createParticipantDto.email}) already exists`;
        console.error(errorMsg);
        throw new BadRequestException(errorMsg);
      }
      throw new Error('Error creating participant');
    }
  }

  async update(
    id: number,
    updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant | null> {
    return this.participantRepository.update(id, updateParticipantDto);
  }

  async delete(id: number): Promise<void> {
    return this.participantRepository.delete(id);
  }
}
