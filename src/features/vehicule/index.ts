import { vehiculeRepository } from "./outbound/vehicule.repository";
import { vehiculeService } from "./domain/vehicule.service";
import { vehiculeController } from "./inbound/vehicule.controller";
require('dotenv').config()

const secret = process.env.JWT_SECRET

const repo = new vehiculeRepository()
const service = new vehiculeService(repo)
const router = vehiculeController(service)


export default router; 

