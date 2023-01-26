import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";


export const productsRouter = Router({});

productsRouter.get('/', (req:Request, res: Response) => {
    const products = productsRepository.getProducts();
    res.send(products)
})
productsRouter.post('/', (req:Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    if(newProduct){
        res.status(201).send(newProduct)
    } else{
        res.sendStatus(404)
    }
})
