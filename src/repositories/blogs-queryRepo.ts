import {blogCollection, postCollection} from "./db";
import { ObjectId } from "mongodb";
import {getPagesCount, getSkippedNumber, getSort} from "../helpers/paginationFunctions";

type ViewBlogType = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: true
};

type BlogDbType = {
    _id: ObjectId
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: true
};

export const blogsQueryRepo = {
    async getAllBlogs(pageNumber: number, pageSize: number, sortBy: string, sortDirection: 'asc' | 'desc', searchNameTerm?: string){
        const filter = searchNameTerm ? {name: {$regex: searchNameTerm, $options: "i"}} : {};

        const blogs = await blogCollection
            .find(filter)
            .skip(getSkippedNumber(pageNumber, pageSize))
            .limit(pageSize)
            .sort({[sortBy]: getSort(sortDirection)})
            .toArray();

        const totalCount = await blogCollection.countDocuments(filter);
        const map = blogs.map((blog) => {
            return {
                id: blog._id,
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt,
                isMembership: true
            }
        });
        return{
            pagesCount: getPagesCount(totalCount, pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: map
        }
    },

    async getBlogPosts(id: string, pageNumber: number, pageSize: number, sortBy: string, sortDirection: 'asc' | 'desc'){
        const totalCount = await postCollection.countDocuments({blogId: id});
        const blogPosts = await postCollection
            .find({blogId: id})
            .skip(getSkippedNumber(pageNumber, pageSize))
            .limit(pageSize)
            .sort({[sortBy]: getSort(sortDirection)})
            .toArray();

        const map = blogPosts.map((blogPosts) => {
            return {
                id: blogPosts._id,
                title: blogPosts.title,
                shortDescription: blogPosts.shortDescription,
                content: blogPosts.content,
                blogId: blogPosts.blogId,
                blogName: blogPosts.blogName,
                createdAt: blogPosts.createdAt
            }
        });
        return {
            pagesCount: getPagesCount(totalCount, pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: map
        }
    },


    async findBlogById(id: string): Promise<ViewBlogType | null>{
        const foundBlog = await blogCollection.findOne({_id: new ObjectId(id)})
        if(!foundBlog?._id){
            return null
        } else{
            return this.blogWithReplaceId(foundBlog)
        }
    },
    blogWithReplaceId (object: BlogDbType): ViewBlogType{
        return {
            id: object._id.toString(),
            name: object.name,
            description: object.description,
            websiteUrl: object.websiteUrl,
            createdAt: object.createdAt,
            isMembership: true
        }
    }
}