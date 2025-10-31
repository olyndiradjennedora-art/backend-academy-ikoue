
import type { UsersRepository, Users } from "../domain/user.entity";


export class userRepository implements UsersRepository {

    private tab: Users[] = []

    createUser(user: Users): Promise<Users> {
        this.tab.push(user)
        return Promise.resolve(user)
    }

    findUserByEmail(email: string): Promise<string> {
        return Promise.resolve(email)
    }
}
