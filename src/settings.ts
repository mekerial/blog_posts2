import express, {Request, Response} from "express";
import {blogRoute} from "./routes/blog-route";
import {postRoute} from "./routes/post-route";

export const app = express()

app.use(express.json())

app.use('/blogs', blogRoute)
app.use('/posts', postRoute)