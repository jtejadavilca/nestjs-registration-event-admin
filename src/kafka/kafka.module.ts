import { Module } from '@nestjs/common';
import { KafkaProducerService } from './producer/kafka-producer.service';

@Module({
  imports: [],
  controllers: [],
  providers: [KafkaProducerService],
  exports: [KafkaProducerService],
})
export class KafkaModule {}
