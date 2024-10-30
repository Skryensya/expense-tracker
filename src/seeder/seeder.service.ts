// src/seeder/seeder.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Account } from '../account/entities/account.entity';
import { Category } from '../category/entities/category.entity';
import {
  Transaction,
  TransactionType,
} from '../transaction/entities/transaction.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async seed() {
    await this.createUsers();
    await this.createCategories();
    await this.createAccounts();
    await this.createTransactions();
  }

  private async createUsers() {
    const users = [
      {
        name: 'Allison',
        lastname: 'Peña',
        username: 'Skryensya',
        email: 'allison.jpb@gmail.com',
        password: 'password123',
      },
    ];

    for (const user of users) {
      await this.userRepository.save(user);
    }
  }

  private async createCategories() {
    const categories = [
      {
        name: 'Supermercado',
        description: 'Gastos en alimentos y provisiones',
        type: TransactionType.EXPENSE,
      },
      {
        name: 'Salario',
        description: 'Salario mensual',
        type: TransactionType.INCOME,
      },
      {
        name: 'Servicios',
        description: 'Gastos en servicios públicos',
        type: TransactionType.EXPENSE,
      },
      {
        name: 'Entretenimiento',
        description: 'Gastos en ocio y entretenimiento',
        type: TransactionType.EXPENSE,
      },
      {
        name: 'Inversiones',
        description: 'Ingresos de inversiones',
        type: TransactionType.INCOME,
      },
    ];

    for (const category of categories) {
      await this.categoryRepository.save(category);
    }
  }

  private async createAccounts() {
    const user = await this.userRepository.findOne({
      where: { email: 'allison.jpb@gmail.com' },
    });
    const accounts = [
      {
        name: 'Ahorros',
        description: 'Cuenta de ahorros',
        balance: 1500,
        currency: 'USD',
        user,
      },
      {
        name: 'Corriente',
        description: 'Cuenta corriente',
        balance: 800,
        currency: 'USD',
        user,
      },
      {
        name: 'Inversiones',
        description: 'Cuenta de inversiones',
        balance: 5000,
        currency: 'USD',
        user,
      },
    ];

    for (const account of accounts) {
      await this.accountRepository.save(account);
    }
  }

  private async createTransactions() {
    const accounts = await this.accountRepository.find({
      where: { user: { email: 'allison.jpb@gmail.com' } },
    });
    const categories = await this.categoryRepository.find();

    // Generate 20 transactions with random data and assign multiple categories
    const transactions = [
      {
        amount: 100,
        description: 'Compra de supermercado',
        type: TransactionType.EXPENSE,
        date: '2023-10-01',
      },
      {
        amount: 2000,
        description: 'Pago de salario',
        type: TransactionType.INCOME,
        date: '2023-10-02',
      },
      {
        amount: 60,
        description: 'Pago de electricidad',
        type: TransactionType.EXPENSE,
        date: '2023-10-03',
      },
      {
        amount: 120,
        description: 'Cine y cena',
        type: TransactionType.EXPENSE,
        date: '2023-10-04',
      },
      {
        amount: 75,
        description: 'Compra de ropa',
        type: TransactionType.EXPENSE,
        date: '2023-10-05',
      },
      {
        amount: 150,
        description: 'Gastos en transporte',
        type: TransactionType.EXPENSE,
        date: '2023-10-06',
      },
      {
        amount: 300,
        description: 'Pago de internet',
        type: TransactionType.EXPENSE,
        date: '2023-10-07',
      },
      {
        amount: 450,
        description: 'Alquiler',
        type: TransactionType.EXPENSE,
        date: '2023-10-08',
      },
      {
        amount: 800,
        description: 'Intereses de inversión',
        type: TransactionType.INCOME,
        date: '2023-10-09',
      },
      {
        amount: 90,
        description: 'Compra de libros',
        type: TransactionType.EXPENSE,
        date: '2023-10-10',
      },
      {
        amount: 50,
        description: 'Compra de café',
        type: TransactionType.EXPENSE,
        date: '2023-10-11',
      },
      {
        amount: 2300,
        description: 'Bonificación',
        type: TransactionType.INCOME,
        date: '2023-10-12',
      },
      {
        amount: 30,
        description: 'Suscripción a revista',
        type: TransactionType.EXPENSE,
        date: '2023-10-13',
      },
      {
        amount: 120,
        description: 'Mantenimiento de vehículo',
        type: TransactionType.EXPENSE,
        date: '2023-10-14',
      },
      {
        amount: 75,
        description: 'Entradas al teatro',
        type: TransactionType.EXPENSE,
        date: '2023-10-15',
      },
      {
        amount: 50,
        description: 'Donación',
        type: TransactionType.EXPENSE,
        date: '2023-10-16',
      },
      {
        amount: 100,
        description: 'Cena en restaurante',
        type: TransactionType.EXPENSE,
        date: '2023-10-17',
      },
      {
        amount: 40,
        description: 'Paseo en bicicleta',
        type: TransactionType.EXPENSE,
        date: '2023-10-18',
      },
      {
        amount: 250,
        description: 'Compra de regalos',
        type: TransactionType.EXPENSE,
        date: '2023-10-19',
      },
      {
        amount: 200,
        description: 'Pago de seguro',
        type: TransactionType.EXPENSE,
        date: '2023-10-20',
      },
    ];

    // Assign multiple categories and a random account to each transaction
    for (const transactionData of transactions) {
      const transaction = this.transactionRepository.create({
        ...transactionData,
        account: accounts[Math.floor(Math.random() * accounts.length)], // Random account
        categories: [
          categories[Math.floor(Math.random() * categories.length)], // Random category 1
          categories[Math.floor(Math.random() * categories.length)], // Random category 2
        ],
      });
      await this.transactionRepository.save(transaction);
    }
  }
}
