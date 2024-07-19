import { Account } from 'src/account/entities/account.entity';

export class CreateUserDto {
  name: string;
  lastname: string;
  username?: string;
  email: string;
  password: string;
  accounts?: Account[];
}
