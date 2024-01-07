"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRepository = void 0;
const db_1 = require("../db/db");
const mapper_1 = require("../models/blogs/mappers/mapper");
const mongodb_1 = require("mongodb");
class BlogRepository {
    static getAllBlogs(sortData) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const searchNameTerm = (_a = sortData.searchNameTerm) !== null && _a !== void 0 ? _a : null;
            const sortBy = (_b = sortData.sortBy) !== null && _b !== void 0 ? _b : 'createdAt';
            const sortDirection = (_c = sortData.sortDirection) !== null && _c !== void 0 ? _c : 'desc';
            const pageNumber = (_d = sortData.pageNumber) !== null && _d !== void 0 ? _d : 1;
            const pageSize = (_e = sortData.pageSize) !== null && _e !== void 0 ? _e : 10;
            let filter = {};
            if (searchNameTerm) {
                filter = {
                    name: {
                        $regex: searchNameTerm, $options: 'i'
                    }
                };
            }
            const blogs = yield db_1.blogCollection
                .find(filter)
                .sort({ [sortBy]: sortDirection === 'desc' ? -1 : 1 })
                .skip((pageNumber - 1) * pageSize)
                .limit(+pageSize)
                .toArray();
            const totalCount = yield db_1.blogCollection.countDocuments(filter);
            const pagesCount = Math.ceil(totalCount / +pageSize);
            return { pagesCount,
                page: pageNumber,
                pageSize,
                totalCount,
                items: blogs.map(mapper_1.blogMapper)
            };
        });
    }
    static getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!blog) {
                return null;
            }
            return (0, mapper_1.blogMapper)(blog);
        });
    }
    static createBlog(createdData) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = Object.assign(Object.assign({}, createdData), { createdAt: new Date().toISOString(), isMembership: false });
            const newBlog = yield db_1.blogCollection.insertOne(Object.assign({}, blog));
            return (0, mapper_1.blogMapper)(Object.assign(Object.assign({}, blog), { _id: newBlog.insertedId }));
        });
    }
    static updateBlog(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    name: updatedData.name,
                    description: updatedData.description,
                    websiteUrl: updatedData.websiteUrl
                }
            });
            return !!blog.matchedCount;
        });
    }
    static deleteBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return !!blog.deletedCount;
        });
    }
}
exports.BlogRepository = BlogRepository;
