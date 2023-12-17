"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidation = void 0;
const express_validator_1 = require("express-validator");
const inputValidation = (req, res, next) => {
    const formattedError = (0, express_validator_1.validationResult)(req).formatWith((error) => {
        switch (error.type) {
            case "field":
                return {
                    message: error.msg,
                    field: error.path
                };
            default:
                return {
                    message: error.msg,
                    field: 'Unknown'
                };
        }
    });
    if (!formattedError.isEmpty()) {
        const errorMessage = formattedError.array({ onlyFirstError: true });
        const errors = {
            errorsMessages: errorMessage
        };
        res.status(400).send(errors);
        return;
    }
    next();
};
exports.inputValidation = inputValidation;
