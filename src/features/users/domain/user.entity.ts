
/// [ROUTE/CONTROLLER] --> [USECASE/SERVICE] --> [REPOSITORY] --> [DATABASE]

export type Users = {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    role: string;
}


export interface UsersRepository {
    createUser(user: Users): Promise<Users>;
    findUserByEmail(email: string): Promise<string>; 
    updateUser(id: string, user: Users): Promise<Users>;
    deleteUser(id: string): void;
}





