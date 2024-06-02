"use client";
import { useState, useEffect } from "react";
import StatCard from "./StatCard";

interface QuizProps {
    questions: {
        question: string;
        answers: string[];
        correctAnswer: string;
        quizId: string;
    }[];
    selectedQuizId: string;
    userId: string | undefined;
}

const Quiz = ({ questions, userId, selectedQuizId }: QuizProps) => {
    const filteredQuestions = questions.filter(
        (q) => q.quizId === selectedQuizId
    );

    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [checked, setChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] =
        useState<number | null>(null);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    });

    const { question, answers, correctAnswer, quizId } =
        filteredQuestions[activeQuestion];

    const onAnswerSelected = (
        answer: string,
        idx: number
    ) => {
        setChecked(true);
        setSelectedAnswerIndex(idx);
        if (answer === correctAnswer) {
            setSelectedAnswer(answer);
        } else {
            setSelectedAnswer("");
        }
    };

    const nextQuestion = () => {
        setSelectedAnswerIndex(null);
        setResults((prev) =>
            selectedAnswer
                ? {
                    ...prev,
                    score: prev.score + 1,
                    correctAnswers: prev.correctAnswers + 1,
                }
                : {
                    ...prev,
                    wrongAnswers: prev.wrongAnswers + 1,
                }
        );
        if (activeQuestion !== filteredQuestions.length - 1) {
            setActiveQuestion((prev) => prev + 1);
        } else {
            setShowResults(true);
            setChecked(false);
        }
    };

    useEffect(() => {
        if (showResults) {
            fetch("/api/quizResults", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    quizId: quizId,
                    quizScore: results.score,
                    correctAnswers: results.correctAnswers,
                    wrongAnswers: results.wrongAnswers,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not working");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Quiz results saved successfully:", data);
                })
                .catch((error) => {
                    console.error("Error saving quiz results:", error);
                });
        }
    }, [showResults, results, userId]);

    return (
        <div className="min-h-[500px]">
            <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col">
                {!showResults ? (
                    <>
                        <div className="flex justify-between mb-10 items-center">
                            <div className="bg-primary text-white px-4 rounded-md py-1">
                                <h2>
                                    Question: {activeQuestion + 1}
                                    <span>/{filteredQuestions.length}</span>
                                </h2>
                            </div>

                        </div>

                        <div>
                            <h3 className="mb-5 text-2xl font-bold">
                                {question}
                            </h3>
                            <ul>
                                {answers.map(
                                    (answer: string, idx: number) => (
                                        <li
                                            key={idx}
                                            onClick={() =>
                                                onAnswerSelected(answer, idx)
                                            }
                                            className={`cursor-pointer mb-5 py-3 rounded-md hover:bg-primary hover:text-white px-3
                      ${selectedAnswerIndex === idx &&
                                                "bg-primary text-white"
                                                }
                      `}
                                        >
                                            <span>{answer}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                            <button
                                onClick={nextQuestion}
                                disabled={!checked}
                                className="font-bold"
                            >
                                {activeQuestion === filteredQuestions.length - 1
                                    ? "Finish"
                                    : "Next Question →"}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <h3 className="text-2xl uppercase mb-10">
                            Results 📈
                        </h3>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
                            <StatCard
                                title="Percentage"
                                value={`${(results.score / filteredQuestions.length) * 100}%`}
                            />
                            <StatCard
                                title="Total Questions"
                                value={filteredQuestions.length}
                            />
                            <StatCard
                                title=" Total Score"
                                value={results.score}
                            />
                            <StatCard
                                title="Correct Answers"
                                value={results.correctAnswers}
                            />
                            <StatCard
                                title="Wrong Answers"
                                value={results.wrongAnswers}
                            />
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-10 font-bold uppercase"
                        >
                            Restart Quiz
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
