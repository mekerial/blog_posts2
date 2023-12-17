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
    static createPost(title, shortDescription, content, blogId, blogName) {
        const id = (+(new Date())).toString();
        const post = {
            id,
            title,
            shortDescription,
            content,
            blogId,
            blogName: blogName ? blogName : ""
        };
        db_1.db.posts.push(post);
        return post;
    }
    static updatePost(id, title, shortDescription, content, blogId, blogName) {
        const postIndex = db_1.db.posts.findIndex(i => i.id === id);
        const post = db_1.db.posts.find(p => p.id === id);
        if (!post) {
            return;
        }
        const updatedPost = Object.assign(Object.assign({}, post), { title,
            shortDescription,
            content,
            blogId,
            blogName });
        db_1.db.posts.splice(postIndex, 1, updatedPost);
        return;
    }
    static deletePostById(id) {
        const post = db_1.db.posts.find(p => p.id === id);
        if (!post) {
            return;
        }
        else {
            for (let i = 0; i < db_1.db.posts.length; i++) {
                if (db_1.db.posts[i].id === id) {
                    db_1.db.posts.splice(i, 1);
                    return 204;
                }
            }
        }
        return;
    }
}
exports.PostRepository = PostRepository;
