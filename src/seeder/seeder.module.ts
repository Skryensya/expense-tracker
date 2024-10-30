// src/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { DatabaseModule } from '../database/database.module'; // Import DatabaseModule
import { User } from '../user/entities/user.entity';
import { Account } from '../account/entities/account.entity';
import { Category } from '../category/entities/category.entity';
import { Transaction } from '../transaction/entities/transaction.entity';

@Module({
  imports: [
    DatabaseModule, // Add the DatabaseModule here
    TypeOrmModule.forFeature([User, Account, Category, Transaction]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
