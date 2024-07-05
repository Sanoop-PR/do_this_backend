"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = 5000;
(0, db_1.default)();
app.get("/", (req, res) => {
    res.send('server started..');
});
app.use(express_1.default.static('public'));
app.use('/users', userRoutes_1.default);
app.use('/tasks', taskRoutes_1.default);
app.use('/categories', categoryRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server up and running ${PORT}`);
});
