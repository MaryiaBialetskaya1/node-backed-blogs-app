import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {blogsRouter} from "./routers/blogs-router";
import {postsRouter} from "./routers/posts-router";
import {blogCollection, postCollection, runDb, usersCollection} from "./repositories/db";
import {usersRouter} from "./routers/users-router";

const app = express()
const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)

const port = process.env.PORT || 3007

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/users', usersRouter)

app.get('/', (req:Request, res:Response) => {
    res.send('Hello blogs project!!!')
})

app.delete( '/testing/all-data', async (req: Request, res:Response) =>{
    await blogCollection.deleteMany({});
    await postCollection.deleteMany({});
    await usersCollection.deleteMany({});
    res.send(204)
})

const startApp = async () =>{
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })