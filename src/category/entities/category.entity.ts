// src/category/entities/category.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';
import { TransactionType } from '../../transaction/entities/transaction.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TransactionType, // Specify the enum
    enumName: 'transaction_type', // Provide a custom name for the enum type in PostgreSQL
  })
  type: TransactionType;

  @ManyToOne(() => User, (user) => user.categories)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Transaction, (transaction) => transaction.categories)
  transactions?: Transaction[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date | null;
}
