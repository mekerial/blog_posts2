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
exports.runDb = exports.userCollection = exports.postCollection = exports.blogCollection = exports.database = exports.db = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = 3002;
exports.db = {
    blogs: [],
    posts: [],
};
const uri = process.env.MONGO_URI; // || 'mongodb://localhost:27017'
if (!uri) {
    throw new Error(' ! uri error ! ');
}
const client = new mongodb_1.MongoClient(uri);
exports.database = client.db('blogs-posts');
exports.blogCollection = exports.database.collection('blogs');
exports.postCollection = exports.database.collection('posts');
exports.userCollection = exports.database.collection('users');
const runDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log('Client connected to Db');
        console.log(`listen on port ${port}`);
    }
    catch (err) {
        console.log(`${err}`);
        yield client.close();
    }
});
exports.runDb = runDb;
