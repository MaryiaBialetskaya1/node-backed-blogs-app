import {postCollection} from "./db";
import { ObjectId } from "mongodb";
import {getPagesCount, getSkippedNumber, getSort} from "../helpers/paginationFunctions";

type PostViewType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
};

type PostDbType = {
    _id: ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
};

export  const postsQueryRepo = {
    async getAllPosts(pageNumber: number, pageSize: number, sortBy: string, sortDirection: 'asc' | 'desc'){
        const totalCount = await postCollection.countDocuments({});
        const posts = await postCollection
            .find({})
            .skip(getSkippedNumber(pageNumber, pageSize))
            .limit(pageSize)
            .sort({[sortBy]: getSort(sortDirection)})
            .toArray();

        const map = posts.map((post) => {
            return {
                id: post._id,
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt
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

    async findPostById(id: string): Promise<PostViewType | null>{
        const foundPost = await postCollection.findOne({_id: new ObjectId(id)})
        if(!foundPost?._id){
            return null
        } else{
            return this.blogWithReplaceId(foundPost)
        }
    },

    blogWithReplaceId (object: PostDbType): PostViewType{
        return {
            id: object._id.toString(),
            title: object.title,
            shortDescription: object.shortDescription,
            content: object.content,
            blogId: object.blogId,
            blogName: object.blogName,
            createdAt: object.createdAt
        }
    }
}