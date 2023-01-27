import { postCollection, postsType} from "./db";
import {ObjectId} from "mongodb";

export let posts: postsType[] = [];

export const postsRepository = {

    async createPost(newPost: postsType): Promise<string>{
        const result = await postCollection.insertOne(newPost);
        return result.insertedId.toString();
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean>{

        const result = await postCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set: {
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    blogId: blogId}}
        );
        return result.matchedCount === 1;
    },

    async deletePost(id: string): Promise<boolean> {
        const result = await postCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1;
    },

    async deleteAll(){
        return await postCollection.deleteMany({});
    }
}