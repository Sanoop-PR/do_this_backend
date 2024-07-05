import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import User from "../models/userModel"



export const authenticationMiddleware = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = request.headers
    if (!authorization) {
      return response.status(401).json({
        error: "Authorization is required",
      })
    }
    const token = authorization

    const {_id}: any = jwt.verify(token, 'express')
        request.user = await User.findOne({_id}).select('_id')
        next()

  } catch (error) {
    console.log("error in authenticationMiddleware", error)
    throw error
  }
}