import type { CreateUserInput, UpdateUserInput, User, UsersRepository } from "../domain/user.entity";
import { UserService } from "../domain/user.service";
import { createApp } from "../../../app/app";

export class InMemoryUserRepository implements UsersRepository {
    private readonly items = new Map<string, User>();
  
    async create(user: CreateUserInput): Promise<User> {
      this.items.set(user.user_id, user);
      return user;
    }
  
    async findAll(): Promise<User[]> {
      return Array.from(this.items.values());
    }
  
    async findByEmail(email: string): Promise<User | undefined> {
      return Array.from(this.items.values()).find((item) => item.user_email === email);
    }
  
    async update(userId: string, data: UpdateUserInput): Promise<User | undefined> {
      const existing = this.items.get(userId);
      if (!existing) {
        return undefined;
      }
      const updated: User = { ...existing, ...data, user_id: userId };
      this.items.set(userId, updated);
      return updated;
    }
  
    async delete(userId: string): Promise<boolean> {
      return this.items.delete(userId);
    }
  }
  
  const createNullUserRepository = (): UsersRepository => ({
    async create(_data: CreateUserInput): Promise<User> {
      throw new Error('Méthode non supportée dans ce contexte.');
    },
    async findAll(): Promise<User[]> {
      return [];
    },
    async findByEmail(): Promise<User | undefined> {
      return undefined;
    },
    async update(_userId: string, _data: UpdateUserInput): Promise<User | undefined> {
      throw new Error('Méthode non supportée dans ce contexte.');
    },
    async delete(): Promise<boolean> {
      throw new Error('Méthode non supportée dans ce contexte.');
    },
    
  });
  
  
  const buildTestApp = (userRepository: UsersRepository) => {
    const userService = new UserService(userRepository);
    return createApp({ userService: userService });
  };