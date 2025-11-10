import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

import db from '../../../db';
import { userTable } from '../../../db/schema/user';
import type {
  CreateUserInput,
  UpdateUserInput,
  User,
  UsersRepository,
} from '../domain/user.entity';

export class UserRepository implements UsersRepository {
  async create(user: CreateUserInput): Promise<User> {
    const [created] = await db.insert(userTable).values(user).returning();
    if (!created) {
      throw new Error("Échec de la création de l'utilisateur.");
    }
    return created;
  }

  async findAll(): Promise<User[]> {
    return db.select().from(userTable);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(userTable).where(eq(userTable.user_email, email));
    return result.at(0);
  }

  async update(userId: string, data: UpdateUserInput): Promise<User | undefined> {
    const [updated] = await db
      .update(userTable)
      .set(data)
      .where(eq(userTable.user_id, userId))
      .returning();
    return updated ?? undefined;
  }

  async login(email: string, password: string): Promise<string | undefined> {
    const user = await this.findByEmail(email);
    if(!user) {
      return undefined;
    }
    const comparePassword = await bcrypt.compare(password, user.user_password);
    if(!comparePassword) {
      throw new Error("Mot de passe incorrect.");
    }
  }
  async delete(userId: string): Promise<boolean> {
    const deleted = await db
      .delete(userTable)
      .where(eq(userTable.user_id, userId))
      .returning();
    return deleted.length > 0;
  }
}

