export interface User {
  user_id: string;
  user_nom: string;
  user_prenom: string;
  user_email: string;
  user_password: string;
  user_role: string;
}

export type CreateUserInput = User;

export type UpdateUserInput = Partial<Omit<User, 'user_id'>>;

export interface UsersRepository {
  create(user: CreateUserInput): Promise<User>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  update(userId: string, data: UpdateUserInput): Promise<User | undefined>;
  delete(userId: string): Promise<boolean>;
}

