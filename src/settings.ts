import express, {Request, Response} from "express";
import {blogRoute} from "./routes/blog-route";
import {postRoute} from "./routes/post-route";
import {db} from "./db/db";

export const app = express()

app.use(express.json())
app.delete('/testing/all-data', (req: Request, res: Response) => {
    db.blogs.length = 0;
    db.posts.length = 0;
    res.sendStatus(204)
})
app.use('/blogs', blogRoute)
app.use('/posts', postRoute)
