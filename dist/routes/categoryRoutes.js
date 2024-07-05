"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoryController_1 = require("../controllers/CategoryController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const categoryRoutes = express_1.default.Router();
categoryRoutes.use(authMiddleware_1.authenticationMiddleware);
categoryRoutes.route('/').get(CategoryController_1.getAllCategory);
categoryRoutes.route('/:id').get(CategoryController_1.getCategoryById);
categoryRoutes.route('/create').post(CategoryController_1.createCategory);
categoryRoutes.route('/delete/:id').delete(CategoryController_1.deleteCategory);
categoryRoutes.route('/update').put(CategoryController_1.updateCategory);
exports.default = categoryRoutes;
