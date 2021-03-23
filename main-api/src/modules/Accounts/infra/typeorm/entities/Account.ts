import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import MainThing from '@modules/MainThings/infra/typeorm/entities/MainThing';
import BusinessRole from '@modules/BusinessRoles/infra/typeorm/entities/BusinessRole';

@Entity('accounts')
class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 60 })
  password_hash: string;

  @Column({ length: 60 })
  account_name: string;

  @ManyToOne(() => MainThing, { nullable: true })
  @JoinColumn({ name: 'account_main_thing_id' })
  mainThing: MainThing;

  @Column({ nullable: true })
  account_main_thing_id: string;

  @ManyToOne(() => BusinessRole, { nullable: true })
  @JoinColumn({ name: 'account_business_role_id' })
  businessRole: BusinessRole;

  @Column({ nullable: true })
  account_business_role_id: string;

  @CreateDateColumn()
  inserted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Account;
