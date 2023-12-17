import {db} from "../db/db";


export class PostRepository {
    static getAllPosts() {
        return db.posts
    }

    static getPostById(id: string) {
        return db.posts.find(p => p.id === id)
    }

    static createPost(title: string, shortDescription: string, content: string, blogId: string, blogName: string) {
        const id = (+(new Date())).toString()
        const post = {
            id,
            title,
            shortDescription,
            content,
            blogId,
            blogName
        }
        db.posts.push(post)
    }
    static updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string, blogName: string) {
        const postIndex = db.posts.findIndex(i => i.id === id)
        const post = db.posts.find(p => p.id === id)
        if (!post) {
            return;
        }
        const updatedPost = {
            ...post,
            title,
            shortDescription,
            content,
            blogId,
            blogName
        }
        db.posts.splice(postIndex, 1, updatedPost)
        return;
    }
    static deletePostById(id: string) {
        const post = db.posts.find(p => p.id === id)
        if (!post) {
            return;
        } else {
            for (let i = 0; i < db.posts.length; i++) {
                if (db.posts[i].id === id) {
                    db.posts.splice(i, 1)
                    return 204
                }
            }
        }
        return
    }
}