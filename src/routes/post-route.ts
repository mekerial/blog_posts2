import {Router, Request, Response} from "express";
import {PostRepository} from "../repositories/post.repository";
import {Params, RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../common";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postValidation} from "../validators/post-validator";
import {CreatePostModel} from "../models/posts/input";
import {BlogRepository} from "../repositories/blog-repository";
import {OutputPostModel} from "../models/posts/output";
import {ObjectId} from "mongodb";


export const postRoute = Router({})

postRoute.get('/', async (req: Request, res: Response) => {
    const posts = await PostRepository.getAllPosts()
    res.status(200).send(posts)
})
postRoute.get('/:id', async (req: RequestWithParams<Params>, res: Response) => {
    const id = req.params.id


    if (!ObjectId.isValid(id)) {
        res.sendStatus(404)
        return;
    }

    const post = await PostRepository.getPostById(id)

    res.status(200).send(post)
})
postRoute.post('/', authMiddleware, postValidation(), async (req: RequestWithBody<CreatePostModel>, res: Response<OutputPostModel>) => {
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const blogId = req.body.blogId


    const blog = await BlogRepository.getBlogById(blogId)

    const newPost: CreatePostModel = {
        title,
        shortDescription,
        content,
        blogId,
    }

    const createdPost = await PostRepository.createPost(newPost)

    res.status(201).send(createdPost)
})

postRoute.put('/:id', authMiddleware, postValidation(), async (req: RequestWithBodyAndParams<Params, any>, res: Response) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
        res.sendStatus(404)
        return;
    }

    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const blogId = req.body.blogId

    const post = await PostRepository.getPostById(id)
    const blog = await BlogRepository.getBlogById(blogId)

    if (!post) {
        res.sendStatus(404)
        return
    }
    const isPostUpdated = await PostRepository.updatePost(id, {title, shortDescription, content, blogId})

    if (isPostUpdated) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

postRoute.delete('/:id', authMiddleware, async (req: RequestWithParams<string>, res: Response) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
        res.sendStatus(404)
        return;
    }

    const isDeletedPost = await PostRepository.deletePostById(id)

    if (isDeletedPost) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }

})