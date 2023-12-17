import {db} from "../db/db";


export class BlogRepository {
    static getAllBlogs() {
        return db.blogs
    }

    static getBlogById(id: string) {
        return db.blogs.find(b => b.id === id)
    }

    static createBlog(name: string, description: string, websiteUrl: string) {
        const id = (+(new Date())).toString()
        const blog = {
            id,
            name,
            description,
            websiteUrl
        }
        db.blogs.push(blog)
        return(blog)
    }

    static updateBlog(id: string, name: string, description: string, websiteUrl: string) {
        const blogIndex = db.blogs.findIndex(i => i.id === id)
        const blog = db.blogs.find(b => b.id === id)
        if (!blog) {
            return;
        }
        const updatedBlog = {
            ...blog,
            name,
            description,
            websiteUrl
        }
        db.blogs.splice(blogIndex, 1, updatedBlog)
        return true;
    }
    static deleteBlogById(id: string) {
        const blog = db.blogs.find(b => b.id === id)
        if (!blog) {
            return;
        } else {
            for (let i = 0; i < db.blogs.length; i++) {
                if (db.blogs[i].id === id) {
                    db.blogs.splice(i, 1)
                    return 204;
                }
            }
        }
        return
    }
}