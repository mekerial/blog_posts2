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
exports.PostRepository = void 0;
const db_1 = require("../db/db");
const mapper_1 = require("../models/posts/mappers/mapper");
const mongodb_1 = require("mongodb");
class PostRepository {
    static getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield db_1.postCollection.find({}).toArray();
            return posts.map(mapper_1.postMapper);
        });
    }
    static getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield db_1.postCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!post) {
                return null;
            }
            return (0, mapper_1.postMapper)(post);
        });
    }
    static createPost(createdData) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogCollection.findOne({ _id: new mongodb_1.ObjectId(createdData.blogId) });
            const post = Object.assign(Object.assign({}, createdData), { blogName: blog.name, createdAt: new Date().toISOString() });
            const newPost = yield db_1.postCollection.insertOne(post);
            newPost.insertedId;
            return {
                id: newPost.insertedId.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt
            };
        });
    }
    static updatePost(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield db_1.postCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    title: updatedData.title,
                    shortDescription: updatedData.shortDescription,
                    content: updatedData.content,
                    blogId: updatedData.blogId,
                }
            });
            return !!post.matchedCount;
        });
    }
    static deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield db_1.postCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return !!post.deletedCount;
        });
    }
}
exports.PostRepository = PostRepository;
