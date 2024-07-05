import express, { Request, Response } from "express"
import cors from 'cors'
import connectToDatabase from "./db";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(express.json())
app.use(cors())

const PORT = 5000
 
connectToDatabase();

app.get("/",(req:Request,res:Response)=>{
    res.send('server started..')
})

app.use(express.static('public'))

app.use('/users',userRoutes)
app.use('/tasks',taskRoutes)
app.use('/categories',categoryRoutes)

app.listen(PORT, () => {
    console.log(`Server up and running ${PORT}`)
})