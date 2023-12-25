import {blogCollection, db, postCollection} from "../db/db";
import {postMapper} from "../models/posts/mapper";
import {ObjectId} from "mongodb";
import {OutputPostModel} from "../models/posts/output";
import {CreatePostModel, UpdatePostModel} from "../models/posts/input";


export class PostRepository {
    static async getAllPosts() {
        const posts = await postCollection.find({}).toArray()
        return posts.map(postMapper)
    }

    static async getPostById(id: string) {
        const post = await postCollection.findOne({_id: new ObjectId(id)})
        if (!post) {
            return null
        }
        return postMapper(post)
    }

    static async createPost(createdData: CreatePostModel): Promise<OutputPostModel | undefined>  {
        const blog = await blogCollection.findOne({_id: new ObjectId(createdData.blogId)})
        const post = await postCollection.insertOne({...createdData, blogName: blog!.name})

        post.insertedId

        return {
            ...{...createdData, blogName: blog!.name},
            id: post.insertedId.toString()
        }
    }
    static async updatePost(id: string, updatedData: UpdatePostModel): Promise<boolean> {
        const post = await postCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                title: updatedData.title,
                shortDescription: updatedData.shortDescription,
                content: updatedData.content,
                blogId: updatedData.blogId,
            }
        })

        return !!post.matchedCount;
    }
    static async deletePostById(id: string): Promise<boolean | null> {
        const post = await postCollection.deleteOne({_id: new ObjectId(id)})

        return !!post.deletedCount;
    }
}