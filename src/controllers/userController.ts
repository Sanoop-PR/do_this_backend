import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import User from "../models/userModel";
import { IUser } from "../types/type";
import Category from '../models/categoryModel'
import Task from "../models/taskModel"
const defaultImg = 'default.jpeg'


const getUserToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign({ _id }, "express", {
    expiresIn: "7d",
  });
  return authenticatedUserToken;
};

export const createUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(409).send("user already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return response.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log("error in createUser", error);
    throw error;
  }
};

export const loginUser = async (request: Request, response: Response) => {
  try {
    const { email, password }: IUser = request.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return response.status(409).send({ message: "User doesn't exist" });
    }
    const isPasswordIdentical = await bcrypt.compare(
      password,
      existingUser.password
    );
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
    } else {
      return response.status(401).send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log("error in loginUser", error);
    throw error;
  }
};

export const getUser = async (request: Request, response: Response) => {
  try {
    const {id} = request.params
    const user = await User.findOne({_id:id})
    return response.status(200).send(user);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const changeName = async (request: Request, response: Response) => {
  try {
    const { id, name } = request.body;
    await User.updateOne(
      { _id: id },
      {
        $set: {
          name,
        },
      }
    );
    return response.status(200).send({ message: "successfully updated" });
  } catch (error) {
    return response.status(404).send({ message: "something went wrong" });
  }
};

export const updatePassword = async (request: Request, response: Response) => {
  try {
    const { id, oldPassword, newPassword } = request.body;

    const existingUser = await User.findOne({ _id: id });

    if (!existingUser) {
      return response.status(409).send({ message: "User doesn't exist" });
    }
    const isPasswordIdentical = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    if (isPasswordIdentical && existingUser) {
      await User.updateOne(
        { _id: id },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );
      return response.status(200).send({ message: "successfull password changed" });
    } else {
      return response.status(401).send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).send('error');
  }
};
 
export const uploadProfilePic = async (
  request: Request,
  response: Response
) => {
  try {
    const { id } = request.body;
    console.log(request.file)
    const profilePic = request?.file?.filename;
    console.log(id, request?.file?.filename);
    const existingUser = await User.findOne({ _id: id });

    if (!existingUser) {
      return response.status(409).send({ message: "User doesn't exist" });
    }

    await User.updateOne(
      { _id: id },
      {
        $set: {
          profilePicture: profilePic,
        },
      }
    );
    return response.status(200).send({ message: "success" });
  } catch (error) {
    console.log('hi'+error);
    throw error;
  }
};

export const removeProfilePic = async (
  request: Request,
  response: Response
) => {
  try {
    const { arg } = request.body;
    const existingUser = await User.findOne({ _id: arg });
    if (!existingUser) {
      return response.status(409).send({ message: "User doesn't exist" });
    }
    await User.updateOne(
      { _id: arg },
      {
        $set: {
          profilePicture: defaultImg,
        },
      }
    );
    return response.status(200).send({ message: "success" });
  } catch (error) {
    console.log('hi'+error);
    throw error;
  }
};

export const deleteAccount = async (request: Request, response: Response) => {
  try {
    const { id, password } = request.body;
    const existingUser = await User.findOne({ _id: id });
    if (!existingUser) {
      return response.status(409).send({ message: "User doesn't exist" });
    }
    const isPasswordIdentical = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordIdentical) {
      try {
        await User.deleteOne({_id:id})
        await Category.deleteMany({user:id})
        await Task.deleteMany({user:id})
        return response.status(200).send({ message: "Account Delete Successfully" });
      } catch (error) {
        return response.status(400).send({ message: "something went wrong" });
      }
    } else {
      console.log('error')
      return response.status(400).send({ message: "wrong password" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).send('error');
  }

}

