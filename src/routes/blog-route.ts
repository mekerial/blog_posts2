import {Router, Request, Response} from "express"
import {BlogRepository} from "../repositories/blog-repository";
import {Params, RequestWithBody, RequestWithBodyAndParams, RequestWithParams, RequestWithQuery} from "../common";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogValidation} from "../validators/blog-validator";
import {CreateBlogModel, QueryBlogInputModel} from "../models/blogs/input";
import {ObjectId} from "mongodb";
import {OutputBlogModel} from "../models/blogs/output";


export const blogRoute = Router({})

blogRoute.get('/', async (req: RequestWithQuery<QueryBlogInputModel>, res: Response) => {
    const sortData = {
        searchNameTerm: req.query.searchNameTerm,
        sortBy: req.query.sortBy,
        sortDirection:  req.query.sortDirection,
        pageNumber:  req.query.pageNumber,
        pageSize: req.query.pageSize
    }
    const blogs = await BlogRepository.getAllBlogs(sortData)

    res.send(blogs)
})
blogRoute.get('/:id', async (req: RequestWithParams<Params>, res: Response) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
        res.sendStatus(404)
        return;
    }

    const blog = await BlogRepository.getBlogById(id)

    if(!blog) {
        res.sendStatus(404)
        return;
    }

    res.send(blog)
})
blogRoute.post('/', authMiddleware, blogValidation(), async (req: RequestWithBody<CreateBlogModel>, res: Response) => {
    const name = req.body.name
    const description = req.body.description
    const websiteUrl = req.body.websiteUrl

    const newBlog: CreateBlogModel = {
        name,
        description,
        websiteUrl
    }

    const createdBlog = await BlogRepository.createBlog(newBlog)

    res.status(201).send(createdBlog)
})
blogRoute.put('/:id', authMiddleware, blogValidation(), async (req: RequestWithBodyAndParams<Params, any>, res: Response) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
        res.sendStatus(404)
        return;
    }

    const name = req.body.name
    const description = req.body.description
    const websiteUrl = req.body.websiteUrl

    const blog = await BlogRepository.getBlogById(id)

    if (!blog) {
        res.sendStatus(404)
        return
    }

    const isBlogUpdated = await BlogRepository.updateBlog(id, {name, description, websiteUrl})

    if (isBlogUpdated) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

blogRoute.delete('/:id', authMiddleware, async (req: RequestWithParams<string>, res: Response) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
        res.sendStatus(404)
        return;
    }

    const isDeletedBlog = await BlogRepository.deleteBlogById(id)

    if (isDeletedBlog) {
        res.sendStatus(204)
        return
    } else {
        res.sendStatus(404)
        return
    }
})