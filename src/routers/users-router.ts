import {Request, Response,Router} from "express";
import {usersService} from "../domain/users-service";
import {queryValidationMiddleware} from "../middlewares/queryValidationMiddleware";
import {usersQueryRepo} from "../repositories/users-queryRepo";

export const usersRouter = Router({})

usersRouter.get('/',
    async (req: Request, res: Response) =>{
        const {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm, searchEmailTerm} = queryValidationMiddleware(req.query)
        const foundUsers = await usersQueryRepo.getAllUsers(pageNumber, pageSize, sortBy, sortDirection, searchNameTerm, searchEmailTerm)
        res.status(200).json(foundUsers);
})

usersRouter.post('/',
    async (req: Request, res: Response) => {
                const newUserId = await usersService.createUser(req.body.login, req.body.email);
                const newUser = await usersQueryRepo.findUserById(newUserId);
                res.status(201).json(newUser)

})

usersRouter.delete('/:id',
    async (req:Request, res: Response) =>{
        const isDeleted: boolean = await usersService.deleteUser(req.params.id)
            if(isDeleted){
                res.sendStatus(204)
            } else{
                res.sendStatus(404)
            }
    })
