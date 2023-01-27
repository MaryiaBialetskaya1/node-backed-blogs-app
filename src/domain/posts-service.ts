import { postsRepository } from "../repositories/posts-db-repository";
import {blogsRepository} from "../repositories/blogs-db-repository";

type TypeNewPost = {
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

export const postService = {
    async createPost(title: string, shortDescription: string, content: string, blogId:string): Promise<string | null>{
        const blog = await blogsRepository.findBlogNameById(blogId);
        if(!blog){
            return null;
        }
        const newPost: TypeNewPost = {
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog,
            createdAt: (new Date(Date.now()).toISOString())
        }
        return await postsRepository.createPost(newPost);
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean>{
        return postsRepository.updatePost(id, title, shortDescription, content, blogId);
    },

    async deletePost(id: string): Promise<boolean> {
        return postsRepository.deletePost(id);
    },

    async deleteAll(){
        return postsRepository.deleteAll();
    }
}