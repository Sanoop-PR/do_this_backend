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
exports.deleteAccount = exports.removeProfilePic = exports.uploadProfilePic = exports.updatePassword = exports.changeName = exports.getUser = exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const taskModel_1 = __importDefault(require("../models/taskModel"));
const defaultImg = 'default.jpeg';
const getUserToken = (_id) => {
    const authenticatedUserToken = jsonwebtoken_1.default.sign({ _id }, "express", {
        expiresIn: "7d",
    });
    return authenticatedUserToken;
};
const createUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = request.body;
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            return response.status(409).send("user already exist");
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        const user = yield userModel_1.default.create({
            name: name,
            email: email,
            password: hashedPassword,
        });
        return response.status(201).send({ message: "User created successfully" });
    }
    catch (error) {
        console.log("error in createUser", error);
        throw error;
    }
});
exports.createUser = createUser;
const loginUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        const existingUser = yield userModel_1.default.findOne({ email });
        if (!existingUser) {
            return response.status(409).send({ message: "User doesn't exist" });
        }
        const isPasswordIdentical = yield bcrypt_1.default.compare(password, existingUser.password);
        if (isPasswordIdentical) {
            const token = getUserToken(existingUser._id);
            return response.send({
                token,
                user: {
                    email: existingUser.email,
                    name: existingUser.name,
                    id: existingUser._id,
                    ProfilePic: existingUser.profilePicture,
                },
            });
        }
        else {
            return response.status(401).send({ message: "Wrong credentials" });
        }
    }
    catch (error) {
        console.log("error in loginUser", error);
        throw error;
    }
});
exports.loginUser = loginUser;
const getUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const user = yield userModel_1.default.findOne({ _id: id });
        return response.status(200).send(user);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getUser = getUser;
const changeName = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name } = request.body;
        yield userModel_1.default.updateOne({ _id: id }, {
            $set: {
                name,
            },
        });
        return response.status(200).send({ message: "successfully updated" });
    }
    catch (error) {
        return response.status(404).send({ message: "something went wrong" });
    }
});
exports.changeName = changeName;
const updatePassword = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, oldPassword, newPassword } = request.body;
        const existingUser = yield userModel_1.default.findOne({ _id: id });
        if (!existingUser) {
            return response.status(409).send({ message: "User doesn't exist" });
        }
        const isPasswordIdentical = yield bcrypt_1.default.compare(oldPassword, existingUser.password);
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 12);
        if (isPasswordIdentical && existingUser) {
            yield userModel_1.default.updateOne({ _id: id }, {
                $set: {
                    password: hashedPassword,
                },
            });
            return response.status(200).send({ message: "successfull password changed" });
        }
        else {
            return response.status(401).send({ message: "Wrong credentials" });
        }
    }
    catch (error) {
        console.log(error);
        return response.status(500).send('error');
    }
});
exports.updatePassword = updatePassword;
const uploadProfilePic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = request.body;
        console.log(request.file);
        const profilePic = (_a = request === null || request === void 0 ? void 0 : request.file) === null || _a === void 0 ? void 0 : _a.filename;
        console.log(id, (_b = request === null || request === void 0 ? void 0 : request.file) === null || _b === void 0 ? void 0 : _b.filename);
        const existingUser = yield userModel_1.default.findOne({ _id: id });
        if (!existingUser) {
            return response.status(409).send({ message: "User doesn't exist" });
        }
        yield userModel_1.default.updateOne({ _id: id }, {
            $set: {
                profilePicture: profilePic,
            },
        });
        return response.status(200).send({ message: "success" });
    }
    catch (error) {
        console.log('hi' + error);
        throw error;
    }
});
exports.uploadProfilePic = uploadProfilePic;
const removeProfilePic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { arg } = request.body;
        const existingUser = yield userModel_1.default.findOne({ _id: arg });
        if (!existingUser) {
            return response.status(409).send({ message: "User doesn't exist" });
        }
        yield userModel_1.default.updateOne({ _id: arg }, {
            $set: {
                profilePicture: defaultImg,
            },
        });
        return response.status(200).send({ message: "success" });
    }
    catch (error) {
        console.log('hi' + error);
        throw error;
    }
});
exports.removeProfilePic = removeProfilePic;
const deleteAccount = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, password } = request.body;
        const existingUser = yield userModel_1.default.findOne({ _id: id });
        if (!existingUser) {
            return response.status(409).send({ message: "User doesn't exist" });
        }
        const isPasswordIdentical = yield bcrypt_1.default.compare(password, existingUser.password);
        if (isPasswordIdentical) {
            try {
                yield userModel_1.default.deleteOne({ _id: id });
                yield categoryModel_1.default.deleteMany({ user: id });
                yield taskModel_1.default.deleteMany({ user: id });
                return response.status(200).send({ message: "Account Delete Successfully" });
            }
            catch (error) {
                return response.status(400).send({ message: "something went wrong" });
            }
        }
        else {
            console.log('error');
            return response.status(400).send({ message: "wrong password" });
        }
    }
    catch (error) {
        console.log(error);
        return response.status(500).send('error');
    }
});
exports.deleteAccount = deleteAccount;
