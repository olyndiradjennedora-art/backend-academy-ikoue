import request from 'supertest';
import { describe, expect, test } from 'bun:test';

import type {
  CreateUserInput,
} from '../features/users/domain/user.entity';
import { InMemoryUserRepository } from '../features/users/outbound/user.adapter';
import { createApp } from '../app/app';
import { UserService } from '../features/users/domain/user.service';
import type { UpdateUserInput } from '../features/users/domain/user.entity';
import { generateToken } from '../lib/auth';

describe('API Utilisateurs', () => {
  test('POST /users crée un utilisateur et le renvoie', async () => {
    const repository = new InMemoryUserRepository();
    const app = createApp({ userService: new UserService(repository) });

    const payload: CreateUserInput = {
      user_id: crypto.randomUUID(),
      user_nom: 'Dora',
      user_prenom: 'Exploratrice',
      user_email: 'dora@example.com',
      user_password: 'p@ssw0rd',
      user_role: 'admin',
    };

    const response = await request(app).post('/users').send(payload);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Utilisateur créé avec succès.');

  });

  test("POST /users renvoie 400 si l'email existe déjà", async () => {
    const repository = new InMemoryUserRepository();
    const app = createApp({ userService: new UserService(repository) });

    const duplicatedEmail = 'dup@example.com';
    const firstUser: CreateUserInput = {
      user_id: crypto.randomUUID(),
      user_nom: 'Alice',
      user_prenom: 'Dupont',
      user_email: duplicatedEmail,
      user_password: 'secret',
      user_role: 'user',
    };
    const secondUser: CreateUserInput = {
      user_id: crypto.randomUUID(),
      user_nom: 'Bob',
      user_prenom: 'Martin',
      user_email: duplicatedEmail,
      user_password: 'secret',
      user_role: 'user',
    };

    await repository.create(firstUser);

    const response = await request(app).post('/users').send(secondUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/email est déjà utilisé/i);
  });

  test('GET /users retourne la liste des utilisateurs', async () => {
    const repository = new InMemoryUserRepository();
    const app = createApp({ userService: new UserService(repository) });

    const existingUsers: CreateUserInput[] = [
      {
        user_id: crypto.randomUUID(),
        user_nom: 'Charlie',
        user_prenom: 'Doe',
        user_email: 'charlie@example.com',
        user_password: 'pwd',
        user_role: 'user',
      },
      {
        user_id: crypto.randomUUID(),
        user_nom: 'Emma',
        user_prenom: 'Smith',
        user_email: 'emma@example.com',
        user_password: 'pwd',
        user_role: 'manager',
      },
    ];

    for (const user of existingUsers) {
      await repository.create(user);
    }

    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(existingUsers.length);
    expect(response.body).toEqual(existingUsers);
  });

  test('PUT /users met à jour un utilisateur', async () => {
    const repository = new InMemoryUserRepository();
    const app = createApp({ userService: new UserService(repository) });
    const existingUser: CreateUserInput = {
      user_id: crypto.randomUUID(),
      user_nom: 'Charlie',
      user_prenom: 'Doe',
      user_email: 'charlie@example.com',
      user_password: 'pwd',
      user_role: 'user',
    };
    await repository.create(existingUser);
    const updatedUser: UpdateUserInput = {
      user_nom: 'Charlie',
      user_prenom: 'Doe',
      user_email: 'charlie@example.com',
      user_password: 'pwd',
      user_role: 'user',
    };

    const response = await request(app).put(`/users/${existingUser.user_id}`).send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('L\'utilisateur a été modifié avec succès.');
  
    const stored = await repository.findByEmail(existingUser.user_email);
    expect(stored).toEqual({ ...existingUser, ...updatedUser });
  });

  test('PUT /users renvoie 404 si l\'utilisateur n\'est pas trouvé', async () => {
    const repository = new InMemoryUserRepository();
    const app = createApp({ userService: new UserService(repository) });
    const updatedUser: UpdateUserInput = {
      user_nom: 'Charlie',
      user_prenom: 'Doe',
      user_email: 'charlie@example.com',
      user_password: 'pwd',
      user_role: 'user',
    };
    const response = await request(app).put(`/users/${crypto.randomUUID()}`).send(updatedUser);
    expect(response.status).toBe(404);
    expect(response.body.error).toMatch(/Utilisateur introuvable/i);
  });

  test('DELETE /users supprime un utilisateur', async () => {
    const repository = new InMemoryUserRepository();
    const app = createApp({ userService: new UserService(repository) });
    const existingUser: CreateUserInput = {
      user_id: crypto.randomUUID(),
      user_nom: 'Charlie',
      user_prenom: 'Doe',
      user_email: 'charlie@example.com',
      user_password: 'pwd',
      user_role: 'user',
    };

    const userAdmin: CreateUserInput = {
      user_id: crypto.randomUUID(),
      user_nom: 'Admin',
      user_prenom: 'Admin',
      user_email: 'admin@example.com',
      user_password: 'admin',
      user_role: 'admin',
    };
     const admin =  await request(app).post('/users').send(userAdmin);
     console.log(admin.body);
    const token = await request(app)
      .post('/users/login')
      .send({ user_email: userAdmin.user_email, user_password: userAdmin.user_password });
    console.log(token.body);
    
    await repository.create(existingUser);
    const response = await request(app).delete(`/users/${existingUser.user_id}`).set('Authorization', `Bearer ${token.body.token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Utilisateur supprimé avec succès.');
    const stored = await repository.findByEmail(existingUser.user_email);
    expect(stored).toBeUndefined();
  });

});
