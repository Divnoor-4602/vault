"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
// import { auth, clerkClient } from "@clerk/nextjs/server";
import User from "../../database/user.model";
import { databaseConnect } from "../mongoose";
import {
  CompleteUserOnboardingParams,
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";

export const createUser = async (userData: CreateUserParams) => {
  try {
    await databaseConnect();

    // Create the user and set the user's initial preferences from the metadata

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

    const { clerk_id, username, email, image_url, preferences } = params;

    const user = await User.findOneAndUpdate(
      { clerk_id },
      {
        username,
        email,
        image_url,
        preferences,
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

// Clerk users actions
export const completeUserOnboarding = async (
  params: CompleteUserOnboardingParams
) => {
  const { authors, genres, books } = params;

  const { userId } = await auth();

  if (!userId) {
    return { message: "No logged in user" };
  }

  const client = await clerkClient();

  try {
    // update the user's public metadata
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        userPreferences: {
          authors,
          genres,
          books,
        },
      },
    });

    return { message: res.publicMetadata };
  } catch (err) {
    return { error: "There was an error updating the user metadata." + err };
  }
};
