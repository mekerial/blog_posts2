"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const blog_route_1 = require("./routes/blog-route");
const post_route_1 = require("./routes/post-route");
const db_1 = require("./db/db");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.delete('/testing/all-data', (req, res) => {
    db_1.db.blogs.length = 0;
    db_1.db.posts.length = 0;
    res.sendStatus(204);
});
exports.app.use('/blogs', blog_route_1.blogRoute);
exports.app.use('/posts', post_route_1.postRoute);
