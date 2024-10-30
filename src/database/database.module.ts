// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { Account } from '../account/entities/account.entity';
import { Category } from '../category/entities/category.entity';
import { Transaction } from '../transaction/entities/transaction.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USER', 'default_user'),
        password: configService.get<string>(
          'DATABASE_PASSWORD',
          'default_password',
        ),
        database: configService.get<string>('DATABASE_NAME', 'expense-tracker'),
        entities: [User, Account, Category, Transaction],
        synchronize: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
