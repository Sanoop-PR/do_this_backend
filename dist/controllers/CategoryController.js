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
exports.updateCategory = exports.deleteCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategory = void 0;
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const taskModel_1 = __importDefault(require("../models/taskModel"));
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const category = yield categoryModel_1.default.find({ user: user });
        return res.send(category);
    }
    catch (error) {
        console.log("error in getAllCategory", error);
        throw error;
    }
});
exports.getAllCategory = getAllCategory;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield categoryModel_1.default.findOne({ _id: id });
        return res.send(category);
    }
    catch (error) {
        console.log("error in getAllTasks", error);
        throw error;
    }
});
exports.getCategoryById = getCategoryById;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { color, icon, name } = req.body;
        if (name == '') {
            return res.status(401).send({ message: "enter something" });
        }
        const { user } = req;
        const category = yield categoryModel_1.default.create({
            color, icon, name, user
        });
        return res.send({ message: "new category created" });
    }
    catch (error) {
        console.log("error in getAllTasks", error);
        res.send({ message: "create category failed" });
        throw error;
    }
});
exports.createCategory = createCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield taskModel_1.default.deleteMany({ categoryId: id });
        const category = yield categoryModel_1.default.deleteOne({ _id: id });
        return res.send({ message: "Category Deleted SuccessFully" });
    }
    catch (error) {
        console.log("error in getAllTasks", error);
        res.send({ error: "Error" });
        throw error;
    }
});
exports.deleteCategory = deleteCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, color, icon, isEditable, name } = req.body;
        yield categoryModel_1.default.updateOne({ _id }, {
            $set: {
                name, color, icon, isEditable
            }
        });
        return res.send({ message: "Category updated successfully" });
    }
    catch (error) {
        console.log("error in getAllTasks", error);
        res.send({ error: "Error" });
        throw error;
    }
});
exports.updateCategory = updateCategory;
