import {body, param} from "express-validator"
import {inputValidation} from "../middlewares/input-model-validation/input-validation";
import {db} from "../db/db";

export const titleValidation = body('title').isString().trim().isLength({min: 1, max: 30}).withMessage('Incorrect title!')
export const shortDescriptionValidation = body('description').isString().trim().isLength({min: 1, max: 100}).withMessage('Incorrect shortDescription!')
export const contentValidation = body('title').isString().trim().isLength({min: 1, max: 1000}).withMessage('Incorrect content!')


export const blogPostValidation = () => [titleValidation, shortDescriptionValidation, contentValidation, inputValidation]

