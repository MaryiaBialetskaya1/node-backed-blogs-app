import {usersCollection, usersType} from "./db";
import {ObjectId} from "mongodb";

export let users: usersType[] = [];

export const usersRepository = {

    async createUser(newUser: usersType): Promise<string>{
        const result = await usersCollection.insertOne(newUser);
        return result.insertedId.toString();
    },
    async deleteUser(id: string): Promise<boolean>{
        const result = await usersCollection.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount === 1;
    }
}