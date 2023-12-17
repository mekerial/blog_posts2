"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRepository = void 0;
const db_1 = require("../db/db");
class BlogRepository {
    static getAllBlogs() {
        return db_1.db.blogs;
    }
    static getBlogById(id) {
        return db_1.db.blogs.find(b => b.id === id);
    }
    static createBlog(name, description, websiteUrl) {
        const id = (+(new Date())).toString();
        const blog = {
            id,
            name,
            description,
            websiteUrl
        };
        db_1.db.blogs.push(blog);
        return (blog);
    }
    static updateBlog(id, name, description, websiteUrl) {
        const blogIndex = db_1.db.blogs.findIndex(i => i.id === id);
        const blog = db_1.db.blogs.find(b => b.id === id);
        if (!blog) {
            return;
        }
        const updatedBlog = Object.assign(Object.assign({}, blog), { name,
            description,
            websiteUrl });
        db_1.db.blogs.splice(blogIndex, 1, updatedBlog);
        return;
    }
    static deleteBlogById(id) {
        const blog = db_1.db.blogs.find(b => b.id === id);
        if (!blog) {
            return;
        }
        else {
            for (let i = 0; i < db_1.db.blogs.length; i++) {
                if (db_1.db.blogs[i].id === id) {
                    db_1.db.blogs.splice(i, 1);
                    return 204;
                }
            }
        }
        return;
    }
}
exports.BlogRepository = BlogRepository;
