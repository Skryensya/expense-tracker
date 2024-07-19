export class CreateTransactionDto {
  amount: number;
  description: string;
  type: 'income' | 'expense';
  date: string;
  categoryId: number;
  accountId: number;
}
