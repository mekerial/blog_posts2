import {blogCollection, db} from "../db/db";
import {OutputBlogModel} from "../models/blogs/output";
import {blogMapper} from "../models/blogs/mappers/mapper";
import {ObjectId} from "mongodb";
import {CreateBlogModel, UpdateBlogModel} from "../models/blogs/input";


export class BlogRepository {
    static async getAllBlogs(): Promise<OutputBlogModel[]> {
        const blogs = await blogCollection.find({}).toArray()
        return blogs.map(blogMapper)
    }

    static async getBlogById(id: string): Promise<OutputBlogModel | null> {
        const blog = await blogCollection.findOne({_id: new ObjectId(id)})
        if (!blog) {
            return null
        }
        return blogMapper(blog)
    }

    static async createBlog(createdData: CreateBlogModel): Promise<OutputBlogModel> {
        const blog = {
            ...createdData,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const newBlog = await blogCollection.insertOne(blog)

        newBlog.insertedId

        return {
            id: newBlog.insertedId.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }
    }

    static async updateBlog(id: string, updatedData: UpdateBlogModel): Promise<boolean> {
        const blog = await blogCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                name: updatedData.name,
                description: updatedData.description,
                websiteUrl: updatedData.websiteUrl
        }})

        return !!blog.matchedCount;
    }
    static async deleteBlogById(id: string): Promise<boolean | null> {
        const blog = await blogCollection.deleteOne({_id: new ObjectId(id)})

        return !!blog.deletedCount
    }
}