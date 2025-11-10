import type { Request, Response } from 'express';
import { verifyToken } from '../../../lib/auth';
import { UserService } from '../domain/user.service';

export class UserController {
  
  constructor(private readonly service: UserService) {}

  create = async (req: Request, res: Response) => {
    try {
      const user = await this.service.create(req.body);
      res.status(201).json({ message: 'Utilisateur créé avec succès.', data: user });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue.';
      res.status(400).json({ error: message });
    }
  };

  findAll = async (_req: Request, res: Response) => {
    try {
      const users = await this.service.getAll();
      res.status(200).json(users);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue.';
      res.status(500).json({ error: message });
    }
  };

  findByEmail = async (req: Request, res: Response) => {
    try {
      const user = await this.service.findByEmail(String(req.params.user_email));
      if (!user) {
        res.status(404).json({ message: 'Utilisateur introuvable.' });
        return;
      }
      res.status(200).json(user);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue.';
      res.status(500).json({ error: message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updated = await this.service.update(String(req.params.user_id), req.body);
      res
        .status(200)
        .json({ message: "L'utilisateur a été modifié avec succès.", data: updated });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue.';
      res.status(404).json({ error: message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const token = await this.service.login(req.body.user_email, req.body.user_password);
      res.status(200).json({ message: "Utilisateur connecté avec succès.", token: token });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue.';
      res.status(401).json({ error: message });
    }
  };

  delete = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if(!token) {
      res.status(401).json({ error: 'Token non fourni.' });
      return;
    }
    const decoded = verifyToken(token);
    if(!decoded) {
      res.status(401).json({ error: 'Token invalide.' });
      return;
    }
    if(decoded.user_role !== 'admin') {
      res.status(401).json({ error: 'Vous n\'avez pas les permissions pour supprimer cet utilisateur.' });
      return;
    }
    await this.service.delete(String(req.params.user_id));
    res.status(200).json({message: "Utilisateur supprimé avec succès."});
    return;
  };
}
