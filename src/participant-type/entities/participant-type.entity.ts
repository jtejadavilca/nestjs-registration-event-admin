import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Participant } from 'src/participant/entities/participant.entity';

@Entity('participant_types') // Nombre de la tabla en la BD
export class ParticipantType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @OneToMany(() => Participant, (participant) => participant.participantType)
  participants: Participant[];
}
