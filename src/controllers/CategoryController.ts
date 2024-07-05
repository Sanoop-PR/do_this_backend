import {Response} from 'express'
import Category from '../models/categoryModel'
import Task from '../models/taskModel'
import {ICategory} from '../types/type'

export const getAllCategory = async (req:any,res:Response) =>{
    try {
        const {user} = req
        const category= await Category.find({user:user})
        return res.send(category)
    } catch (error) {
        console.log("error in getAllCategory", error)
    throw error
    }
}

export const getCategoryById = async (req:any,res:Response) =>{
    try {
        const {id} = req.params
        const category = await Category.findOne({_id:id})
        return res.send(category)
    } catch (error) {
        console.log("error in getAllTasks", error)
        throw error
    }
}

export const createCategory = async (req:any,res:Response) =>{
    try {
        const {color,icon,name} :ICategory = req.body
        if(name==''){
            return res.status(401).send({ message: "enter something" });
        }
        const {user} = req
        const category = await Category.create({
            color,icon,name,user
        })
        return res.send({message: "new category created"})
    } catch (error) {
        console.log("error in getAllTasks", error)
        res.send({ message: "create category failed" })
        throw error
    }
}

export const deleteCategory = async (req:any,res:Response) =>{
    try {
        const {id} = req.params
        await Task.deleteMany({categoryId:id})
        const category = await Category.deleteOne({_id:id})
        return res.send({message:"Category Deleted SuccessFully"})
    } catch (error) {
        console.log("error in getAllTasks", error)
    res.send({ error: "Error" })
    throw error
    }
}

export const updateCategory = async (req:any,res:Response) =>{
    try {
        const {_id,color,icon,isEditable,name}:ICategory = req.body
        await Category.updateOne(
            {_id},{
                $set:{
                    name,color,icon,isEditable
                }
            }
        )
        return res.send({message: "Category updated successfully"})
    } catch (error) {
        console.log("error in getAllTasks", error)
    res.send({ error: "Error" })
    throw error
    }
}