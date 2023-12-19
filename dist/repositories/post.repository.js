"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const db_1 = require("../db/db");
class PostRepository {
    static getAllPosts() {
        return db_1.db.posts;
    }
    static getPostById(id) {
        return db_1.db.posts.find(p => p.id === id);
    }
    static createPost(title, shortDescription, content, blogId) {
        const id = (+(new Date())).toString();
        const blog = db_1.db.blogs.find(b => b.id === blogId);
        const post = {
            id,
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog.name
        };
        db_1.db.posts.push(post);
        return post;
    }
    static updatePost(id, title, shortDescription, content, blogId, blogName) {
        const postIndex = db_1.db.posts.findIndex(i => i.id === id);
        const post = db_1.db.posts.find(p => p.id === id);
        const blog = db_1.db.blogs.find(b => b.id === blogId);
        if (!post) {
            return null;
        }
        const updatedPost = Object.assign(Object.assign({}, post), { title,
            shortDescription,
            content,
            blogId, blogName: blog.name });
        db_1.db.posts.splice(postIndex, 1, updatedPost);
        return updatedPost;
    }
    static deletePostById(id) {
        const post = db_1.db.posts.find(p => p.id === id);
        if (!post) {
            return false;
        }
        else {
            for (let i = 0; i < db_1.db.posts.length; i++) {
                if (db_1.db.posts[i].id === id) {
                    db_1.db.posts.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    }
}
exports.PostRepository = PostRepository;
