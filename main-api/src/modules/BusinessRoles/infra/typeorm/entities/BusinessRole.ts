import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('business_roles')
class BusinessRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  business_role: string;

  @CreateDateColumn()
  inserted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BusinessRole;
