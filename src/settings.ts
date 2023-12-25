import express, {Request, Response} from "express";
import {blogRoute} from "./routes/blog-route";
import {postRoute} from "./routes/post-route";
import {blogCollection, database, db, postCollection} from "./db/db";

export const app = express()

app.use(express.json())
app.delete('/testing/all-data', async (req: Request, res: Response) => {
    // await database.dropDatabase()

    await blogCollection.deleteMany({})
    await postCollection.deleteMany({})

    res.sendStatus(204)
})
app.use('/blogs', blogRoute)
app.use('/posts', postRoute)
