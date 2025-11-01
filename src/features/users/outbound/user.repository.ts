
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

    updateUser(id: string, user: Users): Promise<Users> {
        const index = this.tab.findIndex(u => u.id === id);
        if(index !== 1) null;
        const result = this.tab[index] = {...this.tab[index],...user} 
        return Promise.resolve(result)
    }

    deleteUser(id: string): void {
        const index = this.tab.findIndex(u => u.id === id)
        if(index === -1) false;
        this.tab.splice(index, 1); 
        true
    }
}
