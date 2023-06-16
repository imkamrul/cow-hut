"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleStrictPopulateError = (error) => {
    let errors = [
        {
            path: error.path,
            message: error.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "StrictPopulate Error",
        errorMessages: errors,
    };
};
exports.default = handleStrictPopulateError;
