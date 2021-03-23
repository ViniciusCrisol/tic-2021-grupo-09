import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('main_things')
class MainThing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  main_thing: string;

  @CreateDateColumn()
  inserted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default MainThing;
