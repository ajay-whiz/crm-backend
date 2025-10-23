import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('adminusers')  // Change table name here
export class AdminUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  phoneNumber: string;
}
