"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    statusCode;
    status;
    operationalError;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.operationalError = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = CustomError;
