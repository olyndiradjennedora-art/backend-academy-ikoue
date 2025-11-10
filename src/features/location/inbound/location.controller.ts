import type { Request, Response } from 'express';

import { LocationService } from '../domain/location.service';

export class LocationController {
  constructor(private readonly service: LocationService) {}

  create = async (req: Request, res: Response) => {
    try {
      const location = await this.service.create(req.body);
      res.status(201).json({ message: 'Location ajoutée avec succès.', data: location });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue.';
      res.status(400).json({ error: message });
    }
  };

  findAll = async (_req: Request, res: Response) => {
    try {
      const locations = await this.service.getAll();
      res.status(200).json(locations);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue.';
      res.status(500).json({ error: message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const location = await this.service.findById(String(req.params.loca_id));
      if (!location) {
        res.status(404).json({ message: 'Location introuvable.' });
        return;
      }
      res.status(200).json(location);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue.';
      res.status(500).json({ error: message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updated = await this.service.update(String(req.params.loca_id), req.body);
      res.status(200).json({ message: 'Location modifiée avec succès.', data: updated });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue.';
      res.status(404).json({ error: message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.service.delete(String(req.params.loca_id));
      res.status(204).send();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erreur inattendue.';
      res.status(404).json({ error: message });
    }
  };
}

