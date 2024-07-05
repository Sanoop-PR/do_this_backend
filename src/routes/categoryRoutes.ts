import express from "express"
import { createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from "../controllers/CategoryController"
import { authenticationMiddleware } from "../middleware/authMiddleware"

const categoryRoutes = express.Router()

categoryRoutes.use(authenticationMiddleware)

categoryRoutes.route('/').get(getAllCategory)
categoryRoutes.route('/:id').get(getCategoryById)
categoryRoutes.route('/create').post(createCategory)
categoryRoutes.route('/delete/:id').delete(deleteCategory)
categoryRoutes.route('/update').put(updateCategory)

export default categoryRoutes;