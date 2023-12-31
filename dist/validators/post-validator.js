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
exports.postValidation = exports.blogIdValidation = exports.contentValidation = exports.shortDecribtionValidation = exports.titleValidation = void 0;
const express_validator_1 = require("express-validator");
const input_validation_1 = require("../middlewares/input-model-validation/input-validation");
const blog_repository_1 = require("../repositories/blog-repository");
exports.titleValidation = (0, express_validator_1.body)('title').isString().trim().isLength({ min: 1, max: 30 }).withMessage('Incorrect title!');
exports.shortDecribtionValidation = (0, express_validator_1.body)('shortDescription').isString().trim().isLength({ min: 1, max: 100 }).withMessage('Incorrect shortDescription!');
exports.contentValidation = (0, express_validator_1.body)('content').isString().trim().isLength({ min: 1, max: 1000 }).withMessage('Incorrect content!');
exports.blogIdValidation = (0, express_validator_1.body)('blogId').isString().trim().custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_repository_1.BlogRepository.getBlogById(value);
    if (!blog) {
        throw Error("Incorrect blogId!");
    }
    return true;
})).withMessage('Incorrect blogId!');
const postValidation = () => [exports.titleValidation, exports.shortDecribtionValidation, exports.contentValidation, exports.blogIdValidation, input_validation_1.inputValidation];
exports.postValidation = postValidation;
