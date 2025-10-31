
import { type Vehicules, type VehiculesRepository } from "./vehicule.entity";
import jwt from "jsonwebtoken"

  const jwtSecret = process.env.JWT_SECRET

export interface jwtpayload{
    id: string,
    role: string
}

export class vehiculeService {

    constructor(private repo: VehiculesRepository){
        this.repo = repo;
    }

    async create(vehicule: Vehicules): Promise<Vehicules | undefined>{
        const add = await this.repo.createVehicule(vehicule)
        return Promise.resolve(add)
    }

    async afficher(): Promise<Vehicules[]>{
        const lire = await this.repo.afficherVehicule()
        return Promise.resolve(lire)
    }

    async select(id: string): Promise<Vehicules | undefined>{
        const result = await this.repo.rechercherVehicule(id)
        return Promise.resolve(result)
    }

    async delete(id: string): Promise<void> {
        const reponse = await this.repo.supprimerVehicule(id)
        return Promise.resolve(reponse)
    }


     createToken(id: string, role: string):string {
        const token = jwt.sign( {id, role}, jwtSecret)
         return token;
    }
    

     verifyToken(token: string, role: string):jwtpayload {
      
        if(token == null) {
            return null;
        }
        if(token.startsWith("bearer")) {

            token = token.split(" ")[1]
        }
        const decode = jwt.verify(token, jwtSecret)
        if(decode == null){
            return null;
        } else {
            const payload = decode as jwtpayload
            if(payload.role !== role){
                return null
            } else {
                return payload
            }
        }
    }
}