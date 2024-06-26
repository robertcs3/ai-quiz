import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, quizId, quizScore, correctAnswers, wrongAnswers} = body;
  const createdAt = new Date().toISOString();
  try {
    // Find the user's quiz result for the specific quizId
    const existingQuizResult = await prisma.quizResult.findFirst({
      where: { userId: userId, quizId: quizId },
    });

    if (existingQuizResult) {
      // Update the existing quiz result for the specific quizId
      const updatedQuizResult = await prisma.quizResult.update({
        where: { id: existingQuizResult.id },
        data: {
          quizScore: quizScore,
          correctAnswers: correctAnswers,
          wrongAnswers: wrongAnswers,
          createdAt: createdAt,
        },
      });
      return NextResponse.json({ updatedQuizResult });
    } else {
      // Create a new quiz result for the specific quizId
      const newQuizResult = await prisma.quizResult.create({
        data: {
          quizScore: quizScore,
          correctAnswers: correctAnswers,
          wrongAnswers: wrongAnswers,
          quizId: quizId,
          user: {
            connect: { id: userId },
          },
        },
      });
      return NextResponse.json({ newQuizResult });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "UserId is required" }, { status: 400 });
  }

  try {
    const results = await prisma.quizResult.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch quiz results" }, { status: 500 });
  }
}
