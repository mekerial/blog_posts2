import {Router, Request, Response} from "express"
import {BlogRepository} from "../repositories/blog-repository";
import {Params, RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../common";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogValidation} from "../validators/blog-validator";
import {CreateBlogModel} from "../models/blogs/input";



export const blogRoute = Router({})

blogRoute.get('/', (req: Request, res: Response) => {
    const blogs = BlogRepository.getAllBlogs()
    res.send(blogs)
})
blogRoute.get('/:id', (req: RequestWithParams<Params>, res: Response) => {
    const id = req.params.id

    const blog = BlogRepository.getBlogById(id)

    if(!blog) {
        res.sendStatus(404)
    }

    res.send(blog)
})
blogRoute.post('/', authMiddleware, blogValidation(), (req: RequestWithBody<CreateBlogModel>, res: Response) => {
    let {name, description, websiteUrl} = req.body
    const blog = BlogRepository.createBlog(name, description, websiteUrl)
    res.status(201).send(blog)
})
blogRoute.put('/:id', authMiddleware, blogValidation(), (req: RequestWithBodyAndParams<Params, any>, res: Response) => {
    const id = req.params.id
    let {name, description, websiteUrl} = req.body
    const updatedBlog = BlogRepository.updateBlog(id, name, description, websiteUrl)
    if (updatedBlog) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

blogRoute.delete('/:id', authMiddleware, (req: RequestWithParams<string>, res: Response) => {
    const id = req.params.id
    const deletedBlog = BlogRepository.deleteBlogById(id)
    if (deletedBlog) {
        res.send(204)
    } else {
        res.send(404)
    }
})