"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotsRoutes = void 0;
const express_1 = require("express");
const slots_controller_1 = require("./slots.controller");
const vaildRequest_1 = __importDefault(require("../../middleware/vaildRequest"));
const slots_validation_1 = require("./slots.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const route = (0, express_1.Router)();
route.post('/create-slots', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, vaildRequest_1.default)(slots_validation_1.SlotsValidation.createSlotsValidationSchema), slots_controller_1.SlotsControllers.createSlots);
route.get('/availability', slots_controller_1.SlotsControllers.getAllSlots);
exports.SlotsRoutes = route;
