"use client";
import { useState, useEffect } from "react";
import StatCard from "./StatCard";
import { Button } from "@/components/ui/button"
import { Container } from "./Container";

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
    console.log(questions);
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
        setChecked(false);
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
        }
    };

    const prevQuestion = () => {
        if (activeQuestion > 0) {
            setActiveQuestion((prev) => prev - 1);
            setSelectedAnswerIndex(null);
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

    const answerLabels = ["A.", "B.", "C.", "D."];

    return (
        <Container variant={"constrainedPadded"}>
            <div className="min-h-[500px]">
                <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col">
                    {!showResults ? (
                        <>
                            <div className="flex justify-between mb-8 items-center">
                                <div className="bg-primary text-white px-4 rounded-md py-1">
                                    <h2>
                                        Question: {activeQuestion + 1}
                                        <span>/{filteredQuestions.length}</span>
                                    </h2>
                                </div>
                            </div>
                            <div>
                                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                    {question}
                                </h3>
                                <ul className="my-6 list-disc [&>li]:mt-2">
                                    {answers.map((answer: string, idx: number) => (
                                        <li
                                            key={idx}
                                            className={`block w-fit cursor-pointer mb-4 py-3 rounded-md transition ease-in-out duration-500
            ${selectedAnswerIndex === idx ? "bg-primary text-white" : "hover:bg-primary hover:text-white"}`}
                                            onClick={() => onAnswerSelected(answer, idx)}
                                        >
                                            <span className="px-2">{answerLabels[idx]} {answer}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex pl-2 gap-10">
                                    <Button
                                        onClick={prevQuestion}
                                        disabled={activeQuestion === 0}
                                        className="font-bold"
                                        variant={"outline"}
                                    >
                                        ← Prev
                                    </Button>
                                    <Button
                                        onClick={nextQuestion}
                                        disabled={!checked}
                                        className="font-bold"
                                        variant={"outline"}
                                    >
                                        {activeQuestion === filteredQuestions.length - 1
                                            ? "Finish"
                                            : "Next →"}
                                    </Button>
                                </div>
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
        </Container>
    );
};

export default Quiz;
