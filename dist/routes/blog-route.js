"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoute = void 0;
const express_1 = require("express");
const blog_repository_1 = require("../repositories/blog-repository");
const auth_middleware_1 = require("../middlewares/auth/auth-middleware");
const blog_validator_1 = require("../validators/blog-validator");
exports.blogRoute = (0, express_1.Router)({});
exports.blogRoute.get('/', (req, res) => {
    const blogs = blog_repository_1.BlogRepository.getAllBlogs();
    res.send(blogs);
});
exports.blogRoute.get('/:id', (req, res) => {
    const id = req.params.id;
    const blog = blog_repository_1.BlogRepository.getBlogById(id);
    if (!blog) {
        res.sendStatus(404);
    }
    res.send(blog);
});
exports.blogRoute.post('/', auth_middleware_1.authMiddleware, (0, blog_validator_1.blogValidation)(), (req, res) => {
    let { name, description, websiteUrl } = req.body;
    const blog = blog_repository_1.BlogRepository.createBlog(name, description, websiteUrl);
    res.status(201).send(blog);
});
exports.blogRoute.put('/:id', auth_middleware_1.authMiddleware, (0, blog_validator_1.blogValidation)(), (req, res) => {
    const id = req.params.id;
    let { name, description, websiteUrl } = req.body;
    const updatedBlog = blog_repository_1.BlogRepository.updateBlog(id, name, description, websiteUrl);
    if (updatedBlog) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
exports.blogRoute.delete('/:id', auth_middleware_1.authMiddleware, (req, res) => {
    const id = req.params.id;
    const deletedBlog = blog_repository_1.BlogRepository.deleteBlogById(id);
    if (deletedBlog) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
