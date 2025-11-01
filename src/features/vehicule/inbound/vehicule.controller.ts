
import { type Request, type Response, Router } from "express";
import { vehiculeService } from "../domain/vehicule.service";
import {string, z} from "zod"
import type { Vehicules } from "../domain/vehicule.entity";
import Jwt from "jsonwebtoken"

const vehiculeSchema = z.object({
      marque: z.string(),
      categorie: z.string(),
      anFabrication: z.string(),
      couleur: z.string(),
      carburant: z.string(),
      nmbrePlace: z.string(),
      statut: z.string(),
      prix: z.number(),
      photo: z.string(),
      description: z.string()
})
export function vehiculeController(service: vehiculeService):Router{

     const router = Router()

     router.get('/', async (req: Request, res: Response) => {
       const request = service.afficher()
       res.status(200).json(request

       )

     })
     router.post('/', async (req: Request, res: Response) => {
            const request = req.body;
            const result = vehiculeSchema.parse(request)
            const vehicule = await service.create(request.data)
            res.status(201).send(vehicule);
     })

     router.search('/:id', async (req: Request, res: Response) => {
            const {id} = req.params
            const vehicule = await service.select(id as string)
            res.status(200).json(vehicule);
     })

     router.put('/:id', async (req: Request, res: Response) => {
       const {id} = req.params
       const request = req.body
       const result = await service.modifier(id as string, request)
       res.status(201).json(result)
       
     })

     router.delete('/:id', async (req: Request, res: Response) => {
            const request = req.body
            const vehicule = await service.delete(request)
            res.status(200).json(vehicule);
     })

     return router

}