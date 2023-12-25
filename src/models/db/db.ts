import {OutputBlogModel} from "../blogs/output";
import {OutputPostModel} from "../posts/output";

export type DBType = {
    blogs: OutputBlogModel[],
    posts: OutputPostModel[]
}

export type BlogDBType = {
    name: string,
    description: string,
    websiteUrl: string
    createdAt: string
}

export type PostDBType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}