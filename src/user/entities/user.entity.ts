import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Category } from 'src/category/entities/category.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  username?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Account, (account) => account.user)
  @JoinColumn()
  accounts: Account[];

  @OneToMany(() => Category, (category) => category.user)
  @JoinColumn()
  categories: Category[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date | null;
}
