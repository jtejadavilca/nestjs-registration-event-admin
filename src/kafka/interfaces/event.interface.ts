import { EventType } from './event-type.enum';

export interface Event<T> {
  id: string;
  date: Date;
  type: EventType;
  data: T;
}
