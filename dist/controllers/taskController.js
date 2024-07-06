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
exports.editTask = exports.deleteTask = exports.toggletaskStatus = exports.createTask = exports.getTasksForToday = exports.getAllCompletedTasks = exports.getAllTaskByCategory = exports.getAllTasks = void 0;
const taskModel_1 = __importDefault(require("../models/taskModel"));
const getAllTasks = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.user;
        const tasks = yield taskModel_1.default.find({
            user: userId,
        });
        return response.send(tasks);
    }
    catch (error) {
        console.log("error in getAllTasks", error);
        response.send({ error: "Error while fetching tasks" });
        throw error;
    }
});
exports.getAllTasks = getAllTasks;
const getAllTaskByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const { id } = req.params;
        const tasks = yield taskModel_1.default.find({
            user: userId,
            categoryId: id
        });
        return res.send(tasks);
    }
    catch (error) {
        console.log("error in getAllTasksbycategory", error);
        res.send({ error: "Error while fetching tasks" });
        throw error;
    }
});
exports.getAllTaskByCategory = getAllTaskByCategory;
const getAllCompletedTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const tasks = yield taskModel_1.default.find({
            user: userId,
            isCompleted: true
        });
        return res.send(tasks);
    }
    catch (error) {
        console.log("error in getAllcompletedtasks", error);
        res.send({ error: "Error while fetching tasks" });
        throw error;
    }
});
exports.getAllCompletedTasks = getAllCompletedTasks;
const getTasksForToday = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const todaysDate = new Date();
        todaysDate.setHours(5, 30, 0, 0);
        console.log(todaysDate.toISOString());
        const tasks = yield taskModel_1.default.find({
            user: userId,
            date: todaysDate.toISOString()
        });
        return res.send(tasks);
    }
    catch (error) {
        console.log("error in getTaskforTaday", error);
        res.send({ error: "Error while fetching tasks" });
        throw error;
    }
});
exports.getTasksForToday = getTasksForToday;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const { name, date, categoryId } = req.body;
        if (!name) {
            return res.status(400).send({ message: "Enter Task" });
        }
        const task = yield taskModel_1.default.create({
            name, date, categoryId,
            user: userId
        });
        return res.status(200).send({ message: "New task created" });
    }
    catch (error) {
        console.log("error in createTask", error);
        return res.send({ error: "Error while fetching tasks" });
    }
});
exports.createTask = createTask;
const toggletaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isCompleted } = req.body;
        const { id } = req.params;
        const task = yield taskModel_1.default.updateOne({ _id: id }, { isCompleted });
        return res.send({ messages: "task status updated" });
    }
    catch (error) {
        console.log("error in toggletaskstatus", error);
        res.send({ error: "Error while fetching tasks" });
        throw error;
    }
});
exports.toggletaskStatus = toggletaskStatus;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield taskModel_1.default.deleteOne({
            _id: id
        });
        return res.send({ message: "Task Deleted" });
    }
    catch (error) {
        console.log("error in deletetask", error);
        res.send({ error: "Error while fetching tasks" });
        throw error;
    }
});
exports.deleteTask = deleteTask;
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, categoryId, date, name } = req.body;
        yield taskModel_1.default.updateOne({ _id }, {
            $set: {
                name, categoryId, date
            }
        });
        return res.send({ message: "successfully edited" });
    }
    catch (error) {
        console.log("error in editask", error);
        res.send({ error: "Error while fetching tasks" });
        throw error;
    }
});
exports.editTask = editTask;
