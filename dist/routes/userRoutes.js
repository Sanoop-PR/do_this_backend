"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const multer_1 = __importDefault(require("multer"));
const path = require("path");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cd) {
        cd(null, path.join(__dirname, "../../public/images"));
    },
    filename: function (req, file, cd) {
        cd(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const userRoutes = express_1.default.Router();
userRoutes.route("/create").post(userController_1.createUser);
userRoutes.route("/login").post(userController_1.loginUser);
userRoutes.route("/getUser/:id").get(userController_1.getUser);
userRoutes.route("/update_name").put(userController_1.changeName);
userRoutes.route("/update_password").put(userController_1.updatePassword);
userRoutes.post("/update_profilepic", upload.single('profilePicture'), userController_1.uploadProfilePic);
userRoutes.route("/remove_profilepic").post(userController_1.removeProfilePic);
userRoutes.route("/delete_account").put(userController_1.deleteAccount);
exports.default = userRoutes;
