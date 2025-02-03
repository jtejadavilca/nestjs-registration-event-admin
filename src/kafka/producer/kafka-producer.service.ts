import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { kafkaConfig } from '../kafka-config';
import { Event } from '../interfaces/event.interface';
import { EventType } from '../interfaces/event-type.enum';
import { v4 as uuidv4 } from 'uuid';

export class KafkaProducerService<T> {
  private readonly kafkaInstance: Kafka;
  private readonly producer: Producer;
  constructor() {
    this.kafkaInstance = new Kafka(kafkaConfig);

    this.producer = this.kafkaInstance.producer();
  }

  async publishEvent(topic: string, data: T) {
    const produceRecord: ProducerRecord = this.createProducerRecord(
      topic,
      data,
    );

    await this.producer.connect();
    await this.producer.send(produceRecord);
    await this.producer.disconnect();
  }

  createProducerRecord(topic: string, data: T): ProducerRecord {
    return {
      topic,
      messages: [
        {
          value: JSON.stringify(this.createEvent(data)),
        },
      ],
    };
  }

  createEvent(data: T): Event<T> {
    return {
      id: uuidv4(),
      date: new Date(),
      type: EventType.CREATE,
      data,
    };
  }
}
