import {WithId} from "mongodb";
import {BlogDBType} from "../../db/db";
import {OutputBlogModel} from "../output";

export const blogMapper = (blogDB: WithId<BlogDBType>): OutputBlogModel => {
    return {
        id: blogDB._id.toString(),
        name: blogDB.name,
        description: blogDB.description,
        websiteUrl: blogDB.websiteUrl
    }
}