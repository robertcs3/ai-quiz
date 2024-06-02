import React from 'react'
import Quiz from '@/components/Quiz';
import { client } from "../../../sanity/lib/client";
import { fetchUsers } from "../../(auth)/actions/fetchUsers";
export const dynamic = "force-dynamic";

async function getData() {
  const query = `*[_type == "questions"]{
    question,
    answers,
    correctAnswer,
    quizId
  }`;

  const data = await client.fetch(query);

  return data;
}
const page = async ({ params, }: {
    params: { quizId: string };
}) => {
    const questions = await getData();
    const user = await fetchUsers();
    const userId = user?.data?.user.id;
  return (
    <div>
        <Quiz questions={questions} userId={userId} selectedQuizId={params.quizId} />
    </div>
  )
}

export default page
