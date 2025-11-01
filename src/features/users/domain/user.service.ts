import type { Users} from "./user.entity";
import { userRepository } from "../outbound/user.repository";
import { string } from "zod";

export class userService {

    constructor(private repo: userRepository){
        this.repo = repo;
    }

    async create(user: Users): Promise<Users> {
        const  response = await this.repo.createUser(user)
        return Promise.resolve(response)
    }

    async findByEmail(email: string): Promise<string> {
         const result = await this.repo.findUserByEmail(email)
         return Promise.resolve(result)
    }

    async update(id: string, user: Users): Promise<Users> {
        const result = await this.repo.updateUser(id, user)
        return Promise.resolve(result)
    }

    async delete(id: string): Promise<void> {
        const result = await this.repo.deleteUser(id)
        return Promise.resolve(result)
    }


}
