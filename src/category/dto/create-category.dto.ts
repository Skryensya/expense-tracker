export class CreateCategoryDto {
  type: 'income' | 'expense';
  name: string;
  description: string;
  userId: number;
}
