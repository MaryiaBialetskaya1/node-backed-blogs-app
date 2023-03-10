import {NextFunction, Request, Response} from "express";
import {atob} from "buffer";

export const checkAuthorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.header("Authorization");
    if(!authorization?.startsWith("Basic")){
        return res.sendStatus(401);
    }
    try{
        const[login, pass] = atob(authorization?.split(" ")[1]).split(":");
        if(login !== "admin" || pass !== "qwerty"){
            return res.sendStatus(401);
        } else {
            next();
        }
    } catch (e){
        return res.sendStatus(401)
    }
}

