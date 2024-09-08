"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const sendResponse = (res, data) => {
    var _a;
    if (Array.isArray(data === null || data === void 0 ? void 0 : data.data) && ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.length) === 0) {
        res.status(http_status_1.default.NOT_FOUND).send({
            success: false,
            statusCode: 404,
            message: "No Data Found",
            data: []
        });
    }
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: data === null || data === void 0 ? void 0 : data.message,
        token: data === null || data === void 0 ? void 0 : data.token,
        data: data === null || data === void 0 ? void 0 : data.data
    });
};
exports.default = sendResponse;
