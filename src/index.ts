import express, {Request, Response} from 'express'
const app = express()
const port = 3003

app.get('/', (req:Request, res:Response) => {
    res.send('Hello blogs project!!!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})