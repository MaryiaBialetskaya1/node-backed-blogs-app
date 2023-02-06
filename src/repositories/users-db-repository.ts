import {usersCollection, usersType} from "./db";

export let users: usersType[] = [];

export const usersRepository = {

    async createUser(newUser: usersType): Promise<string>{
        const result = await usersCollection.insertOne(newUser);
        return result.insertedId.toString();
    }
}