import { Request, Response } from "express"
import Task from "../models/taskModel"
import { ITask } from "../types/type"

export const getAllTasks = async (request: any, response: Response) => {
  try {
    const userId = request.user
    const tasks = await Task.find({
      user: userId,
    })
    return response.send(tasks)
  } catch (error) {
    console.log("error in getAllTasks", error)
    response.send({ error: "Error while fetching tasks" })
    throw error
  }
}

export const getAllTaskByCategory = async (req:any,res:Response) =>{
  try {
    const userId = req.user
    const {id} = req.params
    const tasks = await Task.find({
      user:userId,
      categoryId:id
    })
    return res.send(tasks)
  } catch (error) {
    console.log("error in getAllTasksbycategory", error)
    res.send({ error: "Error while fetching tasks" })
    throw error
  }
}

export const getAllCompletedTasks = async (req:any,res:Response) =>{
  try {
    const userId = req.user
    const tasks = await Task.find({
      user:userId,
      isCompleted:true
    })
    return res.send(tasks)
    
  } catch (error) {
    console.log("error in getAllcompletedtasks", error)
    res.send({ error: "Error while fetching tasks" })
    throw error
  }
}
 
export const getTasksForToday = async (req:any,res:Response) =>{
  try {
    const userId = req.user;
    const todaysDate = new Date();
    todaysDate.setHours(5, 30, 0, 0);
    const tasks = await Task.find({
      user:userId,
      date:todaysDate.toISOString()
    })
    return res.send(tasks)
  } catch (error) {
    console.log("error in getTaskforTaday", error)
    res.send({ error: "Error while fetching tasks" })
    throw error
  }
} 

export const createTask = async (req:any,res:Response) =>{
  try {
    const userId = req.user;
    const {name,date,categoryId}:ITask = req.body

    if(!name){
      return res.status(400).send({ message: "Enter Task" });
    }

    const task = await Task.create({
      name,date,categoryId,
      user:userId
    })
    return res.status(200).send({ message: "New task created" });
  } catch (error) {
    console.log("error in createTask", error)
    return res.send({ error: "Error while fetching tasks" })
  }
}

export const toggletaskStatus = async (req:Request,res:Response) =>{
  try {
    const {isCompleted} = req.body;
    const {id} = req.params
  
    const task = await Task.updateOne(
      {_id:id},{isCompleted}
    )
    return res.send({messages:"task status updated"})
    
  } catch (error) {
    console.log("error in toggletaskstatus", error)
    res.send({ error: "Error while fetching tasks" })
    throw error
  }
}

export const deleteTask = async (req:Request,res:Response) =>{
  try {
    const {id} = req.params
    await Task.deleteOne({
      _id:id
    })
    return res.send({message:"Task Deleted"})
  } catch (error) {
    console.log("error in deletetask", error)
    res.send({ error: "Error while fetching tasks" })
    throw error
  }
}

export const editTask = async (req:any,res:Response) =>{
  try {
    const {_id,categoryId,date,name} :ITask = req.body;

    await Task.updateOne(
      {_id},
      {
        $set:{
          name,categoryId,date
        }
      }
    )
    return res.send({ message: "successfully edited" })
  } catch (error) {
    console.log("error in editask", error)
    res.send({ error: "Error while fetching tasks" })
    throw error
  }
}