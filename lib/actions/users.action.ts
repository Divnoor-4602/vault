"use server";

import User from "../../database/user.model";
import { databaseConnect } from "../mongoose";
import { CreateUserParams } from "./shared.types";

export const createUser = async (userData: CreateUserParams) => {
  try {
    console.log("creating user");
    await databaseConnect();

    const user = await User.create(userData);

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async () => {};
