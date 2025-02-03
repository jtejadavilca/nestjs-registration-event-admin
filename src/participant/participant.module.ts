import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { Participant } from './entities/participant.entity';
import { ParticipantMongoDbRepository } from './repository/impl/participant.mongodb.repository';
import { ParticipantRepository } from './repository/participant.repository';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [TypeOrmModule.forFeature([Participant]), KafkaModule],
  controllers: [ParticipantController],
  providers: [
    ParticipantService,
    {
      provide: ParticipantRepository,
      useClass: ParticipantMongoDbRepository,
    },
  ],
})
export class ParticipantModule {}
