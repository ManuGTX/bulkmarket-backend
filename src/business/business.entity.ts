import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('businesses')
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'legal_name', length: 150 })
  legalName: string;

  @Column({ name: 'trade_name', length: 150 })
  tradeName: string;

  @Column({ name: 'tax_id', length: 50, unique: true })
  taxId: string;

  @Column({ length: 40 })
  phone: string;

  @Column({ length: 255 })
  address: string;

  @OneToMany(() => User, (user) => user.business)
  users: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
