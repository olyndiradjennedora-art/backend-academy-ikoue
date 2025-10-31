
import { userService } from "../domain/user.service";
import { type Request, type Response, Router} from "express";
import bcrypt  from "bcryptjs";


export function UserController(service: userService):Router{

    const router = Router()

    router.post('/', async (req: Request, res: Response) => {
        try{
            const users = req.body
            const hash = await bcrypt.hash(users.password, 10)
            const user = await service.create(users)
            res.status(200).json(user)
        } catch {
            res.status(500).json({message: ""});
        }
        
    })

    router.search('/search-email', async (req: Request, res: Response) => {
        const request = req.body
        const email = await service.findByEmail(request)
        res.status(201).json(email)
    })
     
    return router

}