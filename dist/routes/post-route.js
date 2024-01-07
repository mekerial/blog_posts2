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
exports.postRoute = void 0;
const express_1 = require("express");
const post_repository_1 = require("../repositories/post.repository");
const auth_middleware_1 = require("../middlewares/auth/auth-middleware");
const post_validator_1 = require("../validators/post-validator");
const blog_repository_1 = require("../repositories/blog-repository");
const mongodb_1 = require("mongodb");
exports.postRoute = (0, express_1.Router)({});
exports.postRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sortData = {
        pageSize: req.query.pageSize,
        pageNumber: req.query.pageNumber,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
    };
    const posts = yield post_repository_1.PostRepository.getAllPosts(sortData);
    res.status(200).send(posts);
}));
exports.postRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongodb_1.ObjectId.isValid(id)) {
        res.sendStatus(404);
        return;
    }
    const post = yield post_repository_1.PostRepository.getPostById(id);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(post);
}));
exports.postRoute.post('/', auth_middleware_1.authMiddleware, (0, post_validator_1.postValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const blogId = req.body.blogId;
    const blog = yield blog_repository_1.BlogRepository.getBlogById(blogId);
    const newPost = {
        title,
        shortDescription,
        content,
        blogId,
    };
    const createdPost = yield post_repository_1.PostRepository.createPost(newPost);
    res.status(201).send(createdPost);
}));
exports.postRoute.put('/:id', auth_middleware_1.authMiddleware, (0, post_validator_1.postValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongodb_1.ObjectId.isValid(id)) {
        res.sendStatus(404);
        return;
    }
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const blogId = req.body.blogId;
    const post = yield post_repository_1.PostRepository.getPostById(id);
    const blog = yield blog_repository_1.BlogRepository.getBlogById(blogId);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    const isPostUpdated = yield post_repository_1.PostRepository.updatePost(id, { title, shortDescription, content, blogId });
    if (isPostUpdated) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
exports.postRoute.delete('/:id', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongodb_1.ObjectId.isValid(id)) {
        res.sendStatus(404);
        return;
    }
    const isDeletedPost = yield post_repository_1.PostRepository.deletePostById(id);
    if (isDeletedPost) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
