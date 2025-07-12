import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "@/api/axios";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

type Answer = {
  content: string;
  author: string;
  createdAt: string;
};

type Question = {
  _id: string;
  title: string;
  description: string;
  user: { username: string };
  answers: Answer[];
  createdAt: string;
};

export default function AnswerQuestionPage() {
  const { id: questionId } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState<Question | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    } else {
      setIsSignedIn(true);
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const res = await axios.get(`/questions/${questionId}`);
        const fetchedQuestion: Question = res.data;
        setQuestion(fetchedQuestion);
        setAnswers(fetchedQuestion.answers || []);
      } catch (err) {
        console.error("Failed to fetch question", err);
        alert("Unable to load question.");
        navigate("/explore");
      }
    }

    if (questionId) fetchQuestion();
  }, [questionId, navigate]);

  const handleSubmit = async () => {
  if (!answerText.trim()) return;

  try {
    setLoading(true);
    const res = await axios.post(
      `/questions/${questionId}/answers`,
      {
        content: answerText,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // Append the new answer returned from backend
    setAnswers((prev) => [...prev, res.data]);
    setAnswerText("");
    alert("Answer submitted!");
  } catch (err) {
    console.error(err);
    alert("Failed to post answer");
  } finally {
    setLoading(false);
  }
};


  if (!isSignedIn || !question) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">{question.title}</h1>
        <p className="text-muted-foreground">{question.description}</p>
        <p className="text-sm text-muted-foreground mb-4">
          Asked by <strong>{question.user?.username || "Unknown"}</strong> •{" "}
          {new Date(question.createdAt).toLocaleString()}
        </p>

        <div>
          <label className="block font-medium mb-2 text-lg">Your Answer</label>
          <textarea
            rows={6}
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Write your detailed answer here..."
            className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-vertical"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!answerText.trim() || loading}
          className="w-full gradient-primary text-white hover:scale-105 hover:shadow-lg"
        >
          {loading ? "Posting..." : "Post Answer"}
        </Button>

        {answers.length > 0 && (
          <section className="space-y-4 mt-10">
            <h2 className="text-xl font-semibold">Answers</h2>
            {answers.map((answer, index) => (
              <div key={index} className="p-4 border rounded-md bg-muted/40">
                <p className="text-foreground">{answer.content}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  by <span className="font-medium">{answer.author}</span> •{" "}
                  {new Date(answer.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
