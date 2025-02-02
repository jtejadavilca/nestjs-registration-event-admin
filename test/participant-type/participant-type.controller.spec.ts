import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantTypeController } from 'src/participant-type/participant-type.controller';
import { ParticipantTypeService } from 'src/participant-type/participant-type.service';

describe('ParticipantTypeController', () => {
  let controller: ParticipantTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantTypeController],
      providers: [ParticipantTypeService],
    }).compile();

    controller = module.get<ParticipantTypeController>(
      ParticipantTypeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
