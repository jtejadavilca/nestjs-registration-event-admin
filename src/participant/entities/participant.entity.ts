import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ParticipantType } from 'src/participant-type/entities/participant-type.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity('participants') // Nombre de la tabla en la BD
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @ManyToOne(
    () => ParticipantType,
    (participantType) => participantType.participants,
    {
      nullable: false,
      eager: true,
    },
  )
  @JoinColumn({ name: 'participant_type_id' })
  participantType: ParticipantType;

  // @ManyToOne(() => User, (user) => user.participants, {
  //   nullable: false,
  //   eager: true,
  // })
  // @JoinColumn({ name: 'created_by' })
  // createdBy: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
