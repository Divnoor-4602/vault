"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
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

    const { clerk_id, username, email, image_url, interests } = params;

    const user = await User.findOneAndUpdate(
      { clerk_id },
      {
        username,
        email,
        image_url,
        interests,
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

interface CompleteUserOnboardingParams {
  userInterests: {
    subjects: string[];
  };
}

// Clerk users actions
export const completeUserOnboarding = async ({
  userInterests,
}: CompleteUserOnboardingParams) => {
  const { userId } = await auth();

  if (!userId) {
    return { message: "No logged in user" };
  }

  const client = await clerkClient();

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    });

    // update mongo user with interests
    await updateUser({
      clerk_id: userId,
      interests: userInterests.subjects,
    });

    return { message: res.publicMetadata };
  } catch (err) {
    return { error: "There was an error updating the user metadata." + err };
  }
};
