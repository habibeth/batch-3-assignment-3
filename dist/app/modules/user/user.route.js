"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const vaildRequest_1 = __importDefault(require("../../middleware/vaildRequest"));
const router = (0, express_1.Router)();
router.post('/signup', (0, vaildRequest_1.default)(user_validation_1.UserValidation.createUserValidationSchema), user_controller_1.UserControllers.createUser);
exports.UserRoutes = router;
