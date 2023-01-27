import {blogCollection, blogsType} from "./db";
import {ObjectId} from "mongodb";

export let blogs: blogsType[] = [];

export const blogsRepository = {
    async findBlogNameById(id: string): Promise<string | null>{
        const blog = await blogCollection.findOne({_id: new ObjectId(id)})
        if(!blog){
            return null
        }
        return blog.name
    },
    async createBlog(newBlog: blogsType ): Promise<string>{
        const result = await blogCollection.insertOne(newBlog);
        return result.insertedId.toString();
    },
    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean>{
        const result = await blogCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set: {name, description, websiteUrl}}
        );
        return result.matchedCount === 1;
    },
    async deleteBlog(id: string): Promise<boolean>{
        const result = await blogCollection.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount === 1;
    },
    async deleteAll(){
        return await blogCollection.deleteMany({});
    }
}