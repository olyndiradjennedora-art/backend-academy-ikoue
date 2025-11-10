import type {
  CreateUserInput,
  UpdateUserInput,
  User,
  UsersRepository,
} from './user.entity';
import bcrypt from 'bcrypt';
import { generateToken } from '../../../lib/auth';
import type { Payload } from '../../../lib/auth';

const BCRYPT_HASH_PATTERN = /^\$2[aby]\$\d{2}\$/;

export class UserService {
  constructor(private readonly repository: UsersRepository) {}

  async create(user: CreateUserInput): Promise<User> {
    const existing = await this.repository.findByEmail(user.user_email);
    if (existing) {
      throw new Error("Cet email est déjà utilisé par un autre utilisateur.");
    }
    user.user_password = await bcrypt.hash(user.user_password, 10);
    return this.repository.create(user);
  }

 async login(email: string, password: string): Promise<string> {
      
  const user = await this.repository.findByEmail(email);
 
  if(!user) {
    throw new Error("Utilisateur non trouvé.");
  }
 const comparePassword = await bcrypt.compare(password, user.user_password);
  if(!comparePassword) {
    throw new Error("Mot de passe incorrect.");
  }
  const payload: Payload = {
    user_id: user.user_id,
    user_role: user.user_role,
    user_email: user.user_email,
  };
const token = generateToken(payload);
return token;

  }

  async getAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findByEmail(email);
  }

  async update(userId: string, data: UpdateUserInput): Promise<User> {
    const updated = await this.repository.update(userId, data);
    if (!updated) {
      throw new Error("Utilisateur introuvable.");
    }
    return updated;
  }

  async delete(userId: string): Promise<void> {
    const deleted = await this.repository.delete(userId);
    if (!deleted) {
      throw new Error("Aucun utilisateur trouvé à supprimer.");
    }
  }

  async ensurePasswordsAreHashed(): Promise<void> {
    const users = await this.repository.findAll();

    await Promise.all(
      users.map(async (user) => {
        if (BCRYPT_HASH_PATTERN.test(user.user_password)) {
          return;
        }
        const hashedPassword = await bcrypt.hash(user.user_password, 10);
        await this.repository.update(user.user_id, { user_password: hashedPassword });
      }),
    );
  }
}

