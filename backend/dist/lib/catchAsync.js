"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
}
