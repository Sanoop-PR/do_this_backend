import express from "express";
import {
  createUser,
  loginUser,
  changeName,
  updatePassword,
  uploadProfilePic,
  deleteAccount,
  getUser,
  removeProfilePic
} from "../controllers/userController";
import multer from "multer";
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, path.join(__dirname, "../../public/images"));
  },
  filename: function (req, file, cd) {
    cd(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const userRoutes = express.Router();

userRoutes.route("/create").post(createUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/getUser/:id").get(getUser);
userRoutes.route("/update_name").put(changeName);
userRoutes.route("/update_password").put(updatePassword);
userRoutes.post("/update_profilepic",upload.single('profilePicture'),uploadProfilePic);
userRoutes.route("/remove_profilepic").post(removeProfilePic);
userRoutes.route("/delete_account").put(deleteAccount);

export default userRoutes;
