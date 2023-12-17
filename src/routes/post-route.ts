import {Router, Request, Response} from "express";
import {PostRepository} from "../repositories/post.repository";
import {Params, RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../common";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postValidation} from "../validators/post-validator";
import {CreatePostModel} from "../models/posts/input";


export const postRoute = Router({})

postRoute.get('/', (req: Request, res: Response) => {
    const posts = PostRepository.getAllPosts()
    res.send(posts)
})
postRoute.get('/:id', (req: RequestWithParams<Params>, res: Response) => {
    const id = req.params.id
    const post = PostRepository.getPostById(id)
    if (!post) {
        res.sendStatus(404)
    }
    res.status(201).send(post)
})
postRoute.post('/', authMiddleware, postValidation(), (req: RequestWithBody<CreatePostModel>, res: Response) => {
    let {title, shortDescription, content, blogId, blogName} = req.body
    const post = PostRepository.createPost(title, shortDescription, content, blogId, blogName)
    res.status(201).send(post)
})

postRoute.put('/:id', authMiddleware, postValidation(), (req: RequestWithBodyAndParams<Params, any>, res: Response) => {
    const id = req.params.id
    let {title, shortDescription, content, blogId, blogName} = req.body
    const updatedPost = PostRepository.updatePost(id, title, shortDescription, content, blogId, blogName)
    res.sendStatus(204)
})

postRoute.delete('/:id', authMiddleware, (req: RequestWithParams<string>, res: Response) => {
    const id = req.params.id
    const deletedPost = PostRepository.deletePostById(id)
    if (deletedPost) {
        res.send(204)
    } else {
        res.send(404)
    }

})