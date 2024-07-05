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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const authenticationMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = request.headers;
        if (!authorization) {
            return response.status(401).json({
                error: "Authorization is required",
            });
        }
        const token = authorization;
        const { _id } = jsonwebtoken_1.default.verify(token, 'express');
        request.user = yield userModel_1.default.findOne({ _id }).select('_id');
        next();
    }
    catch (error) {
        console.log("error in authenticationMiddleware", error);
        throw error;
    }
});
exports.authenticationMiddleware = authenticationMiddleware;
