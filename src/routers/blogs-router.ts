import {Request, Response, Router} from "express";
import {blogsService} from "../domain/blogs-service";
import {
    contentValidation,
    descriptionValidation,
    nameValidation, shortDescriptionValidation,
    titleValidation,
    youtubeUrlValidation
} from "../middlewares/validationMiddleware";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";
import {checkAuthorizationMiddleware} from "../middlewares/checkAuthorizationMiddleware";
import {blogsQueryRepo} from "../repositories/blogs-queryRepo";
import {postsQueryRepo} from "../repositories/posts-queryRepo";
import {queryValidationMiddleware} from "../middlewares/queryValidationMiddleware";

export const blogsRouter = Router({})

blogsRouter.get('/',
    async (req: Request, res: Response) => {
        const {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm} = queryValidationMiddleware(req.query)
        const foundBlogs = await blogsQueryRepo.getAllBlogs(pageNumber, pageSize, sortBy, sortDirection, searchNameTerm)
        res.status(200).json(foundBlogs);
    })

blogsRouter.get('/:blogId',
    async (req:Request, res:Response) =>{
        const blog = await blogsQueryRepo.findBlogById(req.params.blogId)
        if(!blog){
            res.sendStatus(404)
        } else{
            res.status(200).json(blog)
        }
    })
blogsRouter.get('/:blogId/posts',
    async (req:Request, res:Response) =>{
        const blog = await blogsQueryRepo.findBlogById(req.params.blogId)
        if(!blog){
            res.sendStatus(404)
        } else{
            const {pageNumber, pageSize, sortBy, sortDirection} = queryValidationMiddleware(req.query)
            const blogPosts = await blogsQueryRepo.getBlogPosts(req.params.blogId, pageNumber, pageSize, sortBy, sortDirection)
            res.status(200).json(blogPosts)
        }
    })

blogsRouter.post('/',
    checkAuthorizationMiddleware,
    nameValidation,
    descriptionValidation,
    youtubeUrlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newBlogId = await blogsService.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
        const newBlog = await blogsQueryRepo.findBlogById(newBlogId);
        res.status(201).json(newBlog)
    })

blogsRouter.put('/:blogId',
    checkAuthorizationMiddleware,
    nameValidation,
    descriptionValidation,
    youtubeUrlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const isUpdated: boolean = await blogsService.updateBlog(req.params.blogId, req.body.name, req.body.description, req.body.websiteUrl)
        if (isUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

blogsRouter.delete('/:blogId',
    checkAuthorizationMiddleware,
    async (req: Request, res:Response) => {
        const isDeleted: boolean = await blogsService.deleteBlog(req.params.blogId)
        if(isDeleted){
            res.sendStatus(204)
        } else{
            res.sendStatus(404)
        }
    })

blogsRouter.delete('/',
    checkAuthorizationMiddleware,
    async (req: Request, res:Response) => {
        const isDeleted = await blogsService.deleteAll()
        if (!isDeleted) {
            res.sendStatus(404)
        } else {
            res.sendStatus(204)
        }
    })

blogsRouter.post('/:blogId/posts',
    checkAuthorizationMiddleware,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const blog = await blogsQueryRepo.findBlogById(req.params.blogId)
        if(!blog){
            res.sendStatus(404)
        }
        const blogPosts = await blogsService.createBloggerPost(req.body.title, req.body.shortDescription, req.body.content, req.params.blogId);
        if (blogPosts != null) {
            const post = await postsQueryRepo.findPostById(blogPosts)
            res.status(201).json(post)
        }
    })




