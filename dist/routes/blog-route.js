"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoute = void 0;
const express_1 = require("express");
const blog_repository_1 = require("../repositories/blog-repository");
const auth_middleware_1 = require("../middlewares/auth/auth-middleware");
const blog_validator_1 = require("../validators/blog-validator");
const mongodb_1 = require("mongodb");
const post_repository_1 = require("../repositories/post-repository");
const blog_post_validator_1 = require("../validators/blog-post-validator");
exports.blogRoute = (0, express_1.Router)({});
exports.blogRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sortData = {
        searchNameTerm: req.query.searchNameTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    };
    const blogs = yield blog_repository_1.BlogRepository.getAllBlogs(sortData);
    res.send(blogs);
}));
exports.blogRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongodb_1.ObjectId.isValid(id)) {
        res.sendStatus(404);
        return;
    }
    const blog = yield blog_repository_1.BlogRepository.getBlogById(id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    res.send(blog);
}));
exports.blogRoute.get('/:id/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongodb_1.ObjectId.isValid(id)) {
        res.sendStatus(404);
        return;
    }
    const blog = yield blog_repository_1.BlogRepository.getBlogById(id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    };
    const posts = yield blog_repository_1.BlogRepository.getPostsByBlogId(id, sortData);
    res.send(posts);
}));
exports.blogRoute.post('/:id/posts', auth_middleware_1.authMiddleware, (0, blog_post_validator_1.blogPostValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongodb_1.ObjectId.isValid(id)) {
        res.sendStatus(404);
        return;
    }
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const blog = yield blog_repository_1.BlogRepository.getBlogById(id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    const newPost = {
        title,
        shortDescription,
        content,
    };
    const createdPost = yield post_repository_1.PostRepository.createPost(Object.assign(Object.assign({}, newPost), { blogId: id }));
    res.status(201).send(createdPost);
}));
exports.blogRoute.post('/', auth_middleware_1.authMiddleware, (0, blog_validator_1.blogValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const description = req.body.description;
    const websiteUrl = req.body.websiteUrl;
    const newBlog = {
        name,
        description,
        websiteUrl
    };
    const createdBlog = yield blog_repository_1.BlogRepository.createBlog(newBlog);
    res.status(201).send(createdBlog);
}));
exports.blogRoute.post('/:id/posts', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const blogId = req.params.id;
    const blog = yield blog_repository_1.BlogRepository.getBlogById(blogId);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    const createdPostId = yield blog_repository_1.BlogRepository.createPostToBlog(blogId, { title, shortDescription, content });
    const post = yield post_repository_1.PostRepository.getPostById(createdPostId.toString());
    if (!post) {
        res.sendStatus(404);
        return;
    }
    res.status(201).send(post);
}));
exports.blogRoute.put('/:id', auth_middleware_1.authMiddleware, (0, blog_validator_1.blogValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongodb_1.ObjectId.isValid(id)) {
        res.sendStatus(404);
        return;
    }
    const name = req.body.name;
    const description = req.body.description;
    const websiteUrl = req.body.websiteUrl;
    const blog = yield blog_repository_1.BlogRepository.getBlogById(id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    const isBlogUpdated = yield blog_repository_1.BlogRepository.updateBlog(id, { name, description, websiteUrl });
    if (isBlogUpdated) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
exports.blogRoute.delete('/:id', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongodb_1.ObjectId.isValid(id)) {
        res.sendStatus(404);
        return;
    }
    const isDeletedBlog = yield blog_repository_1.BlogRepository.deleteBlogById(id);
    if (isDeletedBlog) {
        res.sendStatus(204);
        return;
    }
    else {
        res.sendStatus(404);
        return;
    }
}));
