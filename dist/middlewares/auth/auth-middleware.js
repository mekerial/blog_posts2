"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    // if (req.headers['authorization'] !== 'Basic YWRtaW46cXdlcnR5') {
    //     res.sendStatus(401)
    //     return
    // }
    // next()
    const auth = req.headers['authorization'];
    if (!auth) {
        res.sendStatus(401);
        return;
    }
    const [basic, token] = auth.split(" ");
    if (basic !== 'Basic') {
        res.sendStatus(401);
        return;
    }
    const decodeData = Buffer.from(token, 'base64').toString(); //admin:qwerty
    const [login, password] = decodeData.split(":");
    if (login !== process.env.AUTH_LOGIN || password !== process.env.AUTH_PASSWORD) {
        res.sendStatus(401);
        return;
    }
    next();
};
exports.authMiddleware = authMiddleware;
