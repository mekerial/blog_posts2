"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoute = void 0;
const express_1 = require("express");
const post_repository_1 = require("../repositories/post.repository");
const auth_middleware_1 = require("../middlewares/auth/auth-middleware");
const post_validator_1 = require("../validators/post-validator");
exports.postRoute = (0, express_1.Router)({});
exports.postRoute.get('/', (req, res) => {
    const posts = post_repository_1.PostRepository.getAllPosts();
    res.status(200).send(posts);
});
exports.postRoute.get('/:id', (req, res) => {
    const id = req.params.id;
    const post = post_repository_1.PostRepository.getPostById(id);
    if (!post) {
        res.sendStatus(404);
    }
    res.status(200).send(post);
});
exports.postRoute.post('/', auth_middleware_1.authMiddleware, (0, post_validator_1.postValidation)(), (req, res) => {
    let { title, shortDescription, content, blogId, blogName } = req.body;
    const post = post_repository_1.PostRepository.createPost(title, shortDescription, content, blogId, blogName);
    res.status(201).send(post);
});
exports.postRoute.put('/:id', auth_middleware_1.authMiddleware, (0, post_validator_1.postValidation)(), (req, res) => {
    const id = req.params.id;
    let { title, shortDescription, content, blogId, blogName } = req.body;
    const updatedPost = post_repository_1.PostRepository.updatePost(id, title, shortDescription, content, blogId, blogName);
    if (updatedPost) {
        res.sendStatus(404);
    }
    else {
        res.sendStatus(204);
    }
});
exports.postRoute.delete('/:id', auth_middleware_1.authMiddleware, (req, res) => {
    const id = req.params.id;
    const deletedPost = post_repository_1.PostRepository.deletePostById(id);
    if (!deletedPost) {
        res.sendStatus(404);
    }
    else {
        res.sendStatus(204);
    }
});
