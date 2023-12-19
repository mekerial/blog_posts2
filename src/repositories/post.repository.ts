import {db} from "../db/db";


export class PostRepository {
    static getAllPosts() {
        return db.posts
    }

    static getPostById(id: string) {
        return db.posts.find(p => p.id === id)
    }

    static createPost(title: string, shortDescription: string, content: string, blogId: string) {
        const id = (+(new Date())).toString()
        const blog = db.blogs.find(b => b.id === blogId)

        const post = {
            id,
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog!.name
        }

        db.posts.push(post)
        return post
    }
    static updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string, blogName: string) {
        const postIndex = db.posts.findIndex(i => i.id === id)
        const post = db.posts.find(p => p.id === id)
        if (!post) {
            return null;
        }
        const updatedPost = {
            ...post,
            title,
            shortDescription,
            content,
            blogId,
            blogName: blogName ? blogName : ''
        }
        db.posts.splice(postIndex, 1, updatedPost)

        return updatedPost;
    }
    static deletePostById(id: string) {
        const post = db.posts.find(p => p.id === id)

        if (!post) {
            return false;
        } else {
            for (let i = 0; i < db.posts.length; i++) {
                if (db.posts[i].id === id) {
                    db.posts.splice(i, 1)
                    return true
                }
            }
        }
        return false
    }
}