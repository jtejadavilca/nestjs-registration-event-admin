import { KafkaConstants } from './kafka-constants';

export const kafkaConfig = {
  clientId: 'registration-event-admin',
  groupId: 'registration-event-admin',
  kafkaTopic: {
    eventCreateParticipantType: KafkaConstants.TOPIC_CREATE_PARTICIPANT_TYPE,
    eventCreateParticipant: KafkaConstants.TOPIC_CREATE_PARTICIPANT,
  },
  brokers: ['localhost:9092'],
  connectionTimeout: 3000,
  authenticationTimeout: 1000,
  reauthenticationThreshold: 10000,
};
