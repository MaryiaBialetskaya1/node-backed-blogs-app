import {usersCollection} from "./db";
import {ObjectId} from "mongodb";
import {getPagesCount, getSkippedNumber, getSort} from "../helpers/paginationFunctions";

type ViewUserType = {
    id: string
    login: string
    email: string
    createdAt: string
}

type UserDbType = {
    _id: ObjectId
    login: string
    email: string
    createdAt: string
}

export const usersQueryRepo = {
    async getAllUsers(pageNumber: number, pageSize: number, sortBy: string, sortDirection: 'asc' | 'desc', searchNameTerm?: string){
        const filter = searchNameTerm ? {name: {$regex: searchNameTerm, $options: 'i'}} : {};

        const users = await usersCollection
            .find(filter)
            .skip(getSkippedNumber(pageNumber, pageSize))
            .limit(pageSize)
            .sort({[sortBy]: getSort(sortDirection)})
            .toArray();

        const totalCount = await usersCollection.countDocuments(filter);
        const map = users.map((user)=>{
            return{
                id: user._id,
                login: user.login,
                email: user.email,
                createdAt: user.createdAt
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

    async findUserById(id: string): Promise<ViewUserType | null>{
        const foundUser = await usersCollection.findOne({_id: new ObjectId(id)})
        if(!foundUser?._id){
            return null
        } else{
            return this.userWithReplacedId(foundUser)
        }
    },
    userWithReplacedId (object: UserDbType): ViewUserType{
        return {
            id: object._id.toString(),
            login: object.login,
            email: object.email,
            createdAt: object.createdAt
        }
    }
}