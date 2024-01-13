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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const blog_route_1 = require("./routes/blogs/blog-route");
const post_route_1 = require("./routes/posts/post-route");
const user_route_1 = require("./routes/users/user-route");
const db_1 = require("./db/db");
const auth_route_1 = require("./routes/auth/auth-route");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.delete('/testing/all-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // await database.dropDatabase()
    yield db_1.blogCollection.deleteMany({});
    yield db_1.postCollection.deleteMany({});
    yield db_1.userCollection.deleteMany({});
    res.sendStatus(204);
}));
exports.app.use('/blogs', blog_route_1.blogRoute);
exports.app.use('/posts', post_route_1.postRoute);
exports.app.use('/users', user_route_1.userRoute);
exports.app.use('/auth/login', auth_route_1.authRoute);
