"use server";

import User from "../../database/user.model";
import { databaseConnect } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";

export const createUser = async (userData: CreateUserParams) => {
  try {
    await databaseConnect();

    const user = await User.create(userData);

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async (params: UpdateUserParams) => {
  try {
    await databaseConnect();

    const { clerk_id, username, email, image_url } = params;

    const user = await User.findOneAndUpdate(
      { clerk_id },
      {
        username,
        email,
        image_url,
      },
      {
        new: true,
      }
    );

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (params: DeleteUserParams) => {
  try {
    await databaseConnect();

    const { clerk_id } = params;

    await User.findOneAndDelete({ clerk_id });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
