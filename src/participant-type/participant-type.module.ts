import { Module } from '@nestjs/common';
import { ParticipantTypeService } from './participant-type.service';
import { ParticipantTypeController } from './participant-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantType } from './entities/participant-type.entity';
import { ParticipantTypeRepository } from './repository/participant-type.repository';
import { ParticipantTypeMongoDbRepository } from './repository/impl/participant-type.mongodb.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipantType])],
  controllers: [ParticipantTypeController],
  providers: [
    ParticipantTypeService,
    {
      provide: ParticipantTypeRepository,
      useClass: ParticipantTypeMongoDbRepository,
    },
  ],
})
export class ParticipantTypeModule {}
