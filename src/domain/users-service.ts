import {usersRepository} from "../repositories/users-db-repository";

export const usersService = {

    async createUser(login: string, email: string): Promise<string>{
        const newUser = {
            login: login,
            email: email,
            createdAt: (new Date(Date.now()).toISOString()),
        }
        return await usersRepository.createUser(newUser)
    },

    async deleteUser(id: string): Promise<boolean>{
        return await usersRepository.deleteUser(id);
    }
}