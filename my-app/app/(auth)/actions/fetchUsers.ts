"use server"
import { prisma } from "@/lib/prisma";
import { currentUser } from '@clerk/nextjs/server';

export const fetchUsers = async () => {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      throw new Error("No Clerk user found.");
    }

    let mongoUser = await prisma.user.findUnique({
      where: {
        clerkUserId: clerkUser.id,
      },
    });

    if (!mongoUser) {
      const username = clerkUser.username || `${clerkUser.firstName} ${clerkUser.lastName}`;
      const newUser = {
        clerkUserId: clerkUser.id,
        username,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        profilePic: clerkUser.imageUrl || '',
      };
      
      mongoUser = await prisma.user.create({
        data: newUser,
      });
    }

    const quizResults = await prisma.quizResult.findMany({
      where: {
        userId: mongoUser.id,
      },
    });

    return {
      data: {
        user: mongoUser,
        quizResults,
      },
    };
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Error fetching user:", errorMessage);

    return {
      data: null,
      error: errorMessage,
    };
  }
};
