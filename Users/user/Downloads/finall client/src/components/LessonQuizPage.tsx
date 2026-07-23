import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  SkipForward,
  Save,
  Send,
  Award,
  Trophy,
  Flame,
  Zap,
  BookOpen,
  RotateCcw,
  FileText,
  Download,
  ArrowRight,
  Eye,
  PlayCircle,
  ChevronDown,
  Target,
  TrendingUp,
  Brain,
  Droplets,
  Layers,
  Gauge,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { usePageNavigation } from "@/components/PageContext";
import { cn } from "@/lib/utils";

type QuestionType = "single" | "multiple" | "truefalse" | "scenario";

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  id: string;
  type: QuestionType;
  topic: string;
  question: string;
  options: QuizOption[];
  explanation: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  points: number;
}

interface TopicPerformance {
  topic: string;
  icon: typeof Target;
  score: number;
}

const QUIZ_DATA: QuizQuestion[] = [
  {
    id: "q1",
    type: "single",
    topic: "Market Structure",
    question: "What does Forex stand for?",
    difficulty: "beginner",
    points: 10,
    options: [
      { id: "a", text: "Foreign Exchange Market", isCorrect: true },
      { id: "b", text: "Futures Exchange", isCorrect: false },
      { id: "c", text: "Cryptocurrency Market", isCorrect: false },
      { id: "d", text: "Commodity Market", isCorrect: false },
    ],
    explanation:
      "Forex (Foreign Exchange) is the global marketplace where currencies are exchanged. It is the largest financial market in the world, operating 24 hours a day during weekdays with a daily volume exceeding $7 trillion.",
  },
  {
    id: "q2",
    type: "single",
    topic: "Currency Pairs",
    question: "Which currency pair is considered a major pair?",
    difficulty: "beginner",
    points: 10,
    options: [
      { id: "a", text: "EUR/USD", isCorrect: true },
      { id: "b", text: "ZAR/TRY", isCorrect: false },
      { id: "c", text: "SGD/THB", isCorrect: false },
      { id: "d", text: "MXN/SEK", isCorrect: false },
    ],
    explanation:
      "Major currency pairs always include the USD as one of the currencies. EUR/USD is the most traded pair in the world, representing the two largest economies. Other majors include GBP/USD, USD/JPY, and USD/CHF.",
  },
  {
    id: "q3",
    type: "single",
    topic: "Trading Sessions",
    question: "Which session has the highest trading volume?",
    difficulty: "beginner",
    points: 10,
    options: [
      { id: "a", text: "London Session", isCorrect: true },
      { id: "b", text: "Tokyo Session", isCorrect: false },
      { id: "c", text: "Sydney Session", isCorrect: false },
      { id: "d", text: "New York Session", isCorrect: false },
    ],
    explanation:
      "The London session accounts for approximately 43% of global forex trading volume. The London-New York overlap (12:00-16:00 GMT) is the most liquid period, offering the best trading opportunities.",
  },
  {
    id: "q4",
    type: "single",
    topic: "Terminology",
    question: "What is a Pip?",
    difficulty: "beginner",
    points: 10,
    options: [
      { id: "a", text: "The smallest price movement in most currency pairs", isCorrect: true },
      { id: "b", text: "A type of trading account", isCorrect: false },
      { id: "c", text: "A trading platform feature", isCorrect: false },
      { id: "d", text: "A regulatory requirement", isCorrect: false },
    ],
    explanation:
      "A Pip (Point in Percentage) is the smallest standard price move in forex, typically the fourth decimal place (0.0001) for most pairs. For JPY pairs, it's the second decimal place (0.01). For example, EUR/USD moving from 1.1050 to 1.1051 is a 1-pip move.",
  },
  {
    id: "q5",
    type: "single",
    topic: "Risk Management",
    question: "What is Leverage?",
    difficulty: "intermediate",
    points: 15,
    options: [
      { id: "a", text: "Borrowed capital used to increase trade size", isCorrect: true },
      { id: "b", text: "A government trading restriction", isCorrect: false },
      { id: "c", text: "A currency exchange fee", isCorrect: false },
      { id: "d", text: "A profit-sharing agreement", isCorrect: false },
    ],
    explanation:
      "Leverage allows traders to control larger positions with a smaller amount of capital. For example, 100:1 leverage means you can control $100,000 with just $1,000. While leverage amplifies profits, it equally amplifies losses, making risk management critical.",
  },
  {
    id: "q6",
    type: "single",
    topic: "Risk Management",
    question: "What is Stop Loss?",
    difficulty: "intermediate",
    points: 15,
    options: [
      { id: "a", text: "A predefined level that automatically closes a losing trade", isCorrect: true },
      { id: "b", text: "A maximum number of trades per day", isCorrect: false },
      { id: "c", text: "A broker's margin call system", isCorrect: false },
      { id: "d", text: "A regulatory penalty for overtrading", isCorrect: false },
    ],
    explanation:
      "A Stop Loss is an order placed with a broker to automatically close a position at a specified price to limit potential losses. It is one of the most important risk management tools. Professional traders never enter a trade without a stop loss.",
  },
  {
    id: "q7",
    type: "truefalse",
    topic: "Risk Management",
    question: "Risking more than 5% per trade is recommended.",
    difficulty: "beginner",
    points: 10,
    options: [
      { id: "a", text: "True", isCorrect: false },
      { id: "b", text: "False", isCorrect: true },
    ],
    explanation:
      "False. Professional traders typically risk 1-2% of their account per trade. Risking more than 5% is extremely dangerous and can lead to rapid account depletion. A string of just 10 losing trades at 5% risk would wipe out 40% of your account.",
  },
  {
    id: "q8",
    type: "single",
    topic: "Market Structure",
    question: "Which market structure represents higher highs and higher lows?",
    difficulty: "intermediate",
    points: 15,
    options: [
      { id: "a", text: "Uptrend", isCorrect: true },
      { id: "b", text: "Downtrend", isCorrect: false },
      { id: "c", text: "Ranging Market", isCorrect: false },
      { id: "d", text: "Consolidation", isCorrect: false },
    ],
    explanation:
      "An uptrend is defined by price making higher highs (HH) and higher lows (HL). This indicates increasing buying pressure. Traders look for buying opportunities in an uptrend, especially at support levels where higher lows form.",
  },
  {
    id: "q9",
    type: "single",
    topic: "Smart Money Concepts",
    question: "Smart Money Concepts are mostly based on",
    difficulty: "advanced",
    points: 20,
    options: [
      { id: "a", text: "Institutional Trading", isCorrect: true },
      { id: "b", text: "Retail Sentiment", isCorrect: false },
      { id: "c", text: "Technical Indicators", isCorrect: false },
      { id: "d", text: "Fundamental Analysis Only", isCorrect: false },
    ],
    explanation:
      "Smart Money Concepts (SMC) analyze how institutions and large banks manipulate the market. SMC focuses on order blocks, fair value gaps, liquidity zones, and market structure shifts to identify where institutions are placing orders.",
  },
  {
    id: "q10",
    type: "scenario",
    topic: "Trading Psychology",
    question: "Which emotion causes revenge trading?",
    difficulty: "intermediate",
    points: 15,
    options: [
      { id: "a", text: "Anger", isCorrect: true },
      { id: "b", text: "Patience", isCorrect: false },
      { id: "c", text: "Confidence", isCorrect: false },
      { id: "d", text: "Cautiousness", isCorrect: false },
    ],
    explanation:
      "Anger is the primary emotion behind revenge trading. After a loss, traders often feel frustrated and enter impulsive trades to 'win back' their money. This typically leads to even larger losses. Recognizing this emotional trigger is essential for long-term success.",
  },
];

const TOPIC_ICONS: Record<string, TopicPerformance["icon"]> = {
  "Market Structure": Target,
  "Risk Management": ShieldCheck,
  Psychology: Brain,
  Liquidity: Droplets,
  "Order Blocks": Layers,
  "Fair Value Gaps": Gauge,
  "Currency Pairs": TrendingUp,
  "Trading Sessions": Clock,
  Terminology: BookOpen,
  "Smart Money Concepts": Layers,
};

const PASSING_SCORE = 80;
const QUIZ_DURATION = 300;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function LessonQuizPage() {
  const { setCurrentPage } = usePageNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [skipped, setSkipped] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
  const [showVideo, setShowVideo] = useState(false);
  const [attempt, setAttempt] = useState(1);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const autosaveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalQuestions = QUIZ_DATA.length;

  const calculateScore = useCallback(() => {
    let correct = 0;
    let totalPoints = 0;
    let earnedPoints = 0;
    QUIZ_DATA.forEach((q) => {
      totalPoints += q.points;
      const selected = answers[q.id] || [];
      if (selected.length > 0) {
        const correctIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
        const isCorrect =
          selected.length === correctIds.length &&
          selected.every((id) => correctIds.includes(id));
        if (isCorrect) {
          correct++;
          earnedPoints += q.points;
        }
      }
    });
    const percentage = Math.round((correct / totalQuestions) * 100);
    return { correct, percentage, totalPoints, earnedPoints };
  }, [answers, totalQuestions]);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    setShowExplanations(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, handleSubmit]);

  useEffect(() => {
    if (submitted) return;
    autosaveRef.current = setInterval(() => {
      try {
        localStorage.setItem("readypips_quiz_answers", JSON.stringify({ answers, currentQuestion, timeLeft }));
        setSavedAt(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
      } catch {}
    }, 5000);
    return () => { if (autosaveRef.current) clearInterval(autosaveRef.current); };
  }, [answers, currentQuestion, timeLeft, submitted]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("readypips_quiz_answers");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.answers) setAnswers(data.answers);
        if (data.currentQuestion !== undefined) setCurrentQuestion(data.currentQuestion);
      }
    } catch {}
  }, []);

  const selectAnswer = (questionId: string, optionId: string, type: QuestionType) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];
      if (type === "multiple") {
        return {
          ...prev,
          [questionId]: current.includes(optionId)
            ? current.filter((id) => id !== optionId)
            : [...current, optionId],
        };
      }
      return { ...prev, [questionId]: [optionId] };
    });
    setSkipped((prev) => { const s = new Set(prev); s.delete(questionId); return s; });
  };

  const skipQuestion = () => {
    const q = QUIZ_DATA[currentQuestion];
    setSkipped((prev) => new Set(prev).add(q.id));
    if (currentQuestion < totalQuestions - 1) setCurrentQuestion((p) => p + 1);
  };

  const goNext = () => {
    if (currentQuestion < totalQuestions - 1) setCurrentQuestion((p) => p + 1);
  };

  const goPrev = () => {
    if (currentQuestion > 0) setCurrentQuestion((p) => p - 1);
  };

  const retryQuiz = () => {
    setAnswers({});
    setSkipped(new Set());
    setSubmitted(false);
    setShowExplanations(false);
    setCurrentQuestion(0);
    setTimeLeft(QUIZ_DURATION);
    setAttempt((a) => a + 1);
    localStorage.removeItem("readypips_quiz_answers");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const answeredCount = Object.keys(answers).filter((k) => (answers[k] || []).length > 0).length;
  const remainingCount = totalQuestions - answeredCount;
  const scoreData = calculateScore();
  const passed = scoreData.percentage >= PASSING_SCORE;
  const questionProgress = ((currentQuestion + 1) / totalQuestions) * 100;
  const answeredProgress = (answeredCount / totalQuestions) * 100;

  const topicStats = useMemo(() => {
    const topics: Record<string, { correct: number; total: number }> = {};
    QUIZ_DATA.forEach((q) => {
      if (!topics[q.topic]) topics[q.topic] = { correct: 0, total: 0 };
      topics[q.topic].total++;
      const selected = answers[q.id] || [];
      if (selected.length > 0) {
        const correctIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
        const isCorrect = selected.length === correctIds.length && selected.every((id) => correctIds.includes(id));
        if (isCorrect) topics[q.topic].correct++;
      }
    });
    return Object.entries(topics).map(([topic, stats]) => ({
      topic,
      icon: TOPIC_ICONS[topic] || BookOpen,
      score: Math.round((stats.correct / stats.total) * 100),
    }));
  }, [answers]);

  if (submitted) {
    return <QuizResults
      scoreData={scoreData}
      passed={passed}
      answeredCount={answeredCount}
      remainingCount={remainingCount}
      timeTaken={QUIZ_DURATION - timeLeft}
      attempt={attempt}
      answers={answers}
      onRetry={retryQuiz}
      onReview={() => setShowExplanations(true)}
      onNextLesson={() => setCurrentPage("courses")}
      onGoDashboard={() => setCurrentPage("dashboard")}
      topicStats={topicStats}
    />;
  }

  const q = QUIZ_DATA[currentQuestion];
  const selectedIds = answers[q.id] || [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Lesson Quiz</h1>
          <p className="text-[14px] text-text-secondary mt-1">Test your understanding before continuing to the next lesson.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-primary/8 text-primary border-0 rounded-full px-3 py-1 text-[12px] font-medium">
            <BookOpen className="w-3 h-3 mr-1" /> Lesson 1 of 24
          </Badge>
          <Badge className="bg-bg text-text-secondary border border-border rounded-full px-3 py-1 text-[12px] font-medium">
            Beginner
          </Badge>
          <Badge className="bg-bg text-text-secondary border border-border rounded-full px-3 py-1 text-[12px] font-medium">
            <Clock className="w-3 h-3 mr-1" /> 5 Minutes
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Previous Lesson Card */}
          <Card className="rounded-[16px] border-border shadow-card">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-24 h-16 rounded-[12px] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 border border-border">
                  <PlayCircle className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[15px] text-text-primary">Introduction to Forex Markets</h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-[12px] text-text-muted">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 18 minutes</span>
                    <span className="flex items-center gap-1 text-success">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  </div>
                  <button
                    onClick={() => setShowVideo(!showVideo)}
                    className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-primary font-medium hover:underline"
                  >
                    <PlayCircle className="w-4 h-4" />
                    {showVideo ? "Hide Video" : "Replay Lesson Video"}
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", showVideo && "rotate-180")} />
                  </button>
                </div>
              </div>
              <AnimatePresence>
                {showVideo && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 rounded-[12px] overflow-hidden border border-border">
                      <div className="relative pb-[56.25%] h-0">
                        <iframe
                          src="https://www.youtube.com/embed/AIjmFMmFCb8"
                          title="Lesson Video"
                          className="absolute top-0 left-0 w-full h-full"
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div className="px-4 py-3 bg-bg border-t border-border grid grid-cols-2 md:grid-cols-4 gap-3 text-[12px]">
                        <div><span className="text-text-muted block">Duration</span><span className="font-medium text-text-primary">18 min</span></div>
                        <div><span className="text-text-muted block">Instructor</span><span className="font-medium text-text-primary">Michael M.</span></div>
                        <div><span className="text-text-muted block">Course</span><span className="font-medium text-text-primary">Forex 101</span></div>
                        <div><span className="text-text-muted block">Lesson</span><span className="font-medium text-text-primary">Lesson 1</span></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Quiz Card */}
          <Card className="rounded-[16px] border-border shadow-card">
            <CardContent className="p-6">
              {/* Question header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-semibold text-text-primary">
                    Question {currentQuestion + 1} of {totalQuestions}
                  </span>
                  <Badge className={cn(
                    "border-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                    q.difficulty === "beginner" && "bg-success/10 text-success",
                    q.difficulty === "intermediate" && "bg-warning/10 text-warning",
                    q.difficulty === "advanced" && "bg-danger/10 text-danger",
                  )}>
                    {q.difficulty}
                  </Badge>
                </div>
                <span className="text-[12px] text-text-muted">{q.points} pts</span>
              </div>

              {/* Progress bar */}
              <Progress value={questionProgress} className="h-1.5 mb-6" />

              {/* Question */}
              <h2 className="text-[17px] font-semibold text-text-primary leading-relaxed mb-5">
                {q.question}
              </h2>

              {/* Answer options */}
              <div className="space-y-3">
                {q.options.map((option) => {
                  const isSelected = selectedIds.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => selectAnswer(q.id, option.id, q.type)}
                      className={cn(
                        "w-full flex items-center gap-3 p-4 rounded-[14px] border-2 text-left transition-all duration-150 group",
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border bg-white hover:bg-bg hover:border-border"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-border group-hover:border-text-muted"
                      )}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className={cn(
                        "text-[14px] font-medium",
                        isSelected ? "text-text-primary" : "text-text-secondary"
                      )}>
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {q.type === "multiple" && (
                <p className="text-[12px] text-text-muted mt-3 italic">Select all that apply.</p>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 pt-5 border-t border-border">
                <Button
                  variant="outline"
                  onClick={goPrev}
                  disabled={currentQuestion === 0}
                  className="rounded-button h-9 px-4 text-[13px] font-medium"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={skipQuestion}
                    className="text-[13px] text-text-muted hover:text-text-primary h-9 px-3"
                  >
                    <SkipForward className="w-4 h-4 mr-1" /> Skip
                  </Button>
                  {currentQuestion < totalQuestions - 1 ? (
                    <Button
                      onClick={goNext}
                      className="rounded-button h-9 px-4 text-[13px] font-medium"
                    >
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      className="rounded-button h-9 px-5 text-[13px] font-medium bg-primary"
                    >
                      <Send className="w-4 h-4 mr-1" /> Submit Quiz
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Explanation section (after submit only, but pre-mounted for review) */}
          {showExplanations && (
            <ExplanationSection questions={QUIZ_DATA} answers={answers} />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Timer */}
          <Card className="rounded-[16px] border-border shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-[13px] font-semibold text-text-primary">Timer</span>
              </div>
              <div className="text-3xl font-mono font-bold text-text-primary tracking-wide">
                {formatTime(timeLeft)}
              </div>
              <div className="mt-2 text-[12px] text-text-muted">
                Auto-submits when time expires
              </div>
            </CardContent>
          </Card>

          {/* Quiz Progress */}
          <Card className="rounded-[16px] border-border shadow-card">
            <CardContent className="p-5">
              <h3 className="text-[13px] font-semibold text-text-primary mb-4">Quiz Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-text-muted">Answered</span>
                  <span className="text-[13px] font-semibold text-text-primary">{answeredCount}/{totalQuestions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-text-muted">Remaining</span>
                  <span className="text-[13px] font-semibold text-text-secondary">{remainingCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-text-muted">Skipped</span>
                  <span className="text-[13px] font-semibold text-warning">{skipped.size}</span>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[12px] text-text-muted">Est. Score</span>
                    <span className={cn(
                      "text-[13px] font-bold",
                      scoreData.percentage >= PASSING_SCORE ? "text-success" : "text-warning"
                    )}>
                      {scoreData.percentage}%
                    </span>
                  </div>
                  <Progress value={answeredProgress} className="h-1.5" />
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="text-[12px] text-text-muted">Current Grade</span>
                  <Badge className={cn(
                    "border-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                    scoreData.percentage >= 90 ? "bg-success/10 text-success" :
                    scoreData.percentage >= 80 ? "bg-primary/10 text-primary" :
                    scoreData.percentage >= 50 ? "bg-warning/10 text-warning" :
                    "bg-danger/10 text-danger"
                  )}>
                    {scoreData.percentage >= 90 ? "Excellent" :
                     scoreData.percentage >= 80 ? "Good" :
                     scoreData.percentage >= 50 ? "Average" : "Needs Work"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Progress */}
          <Card className="rounded-[16px] border-border shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4 text-success" />
                  <div>
                    <span className="text-[12px] font-medium text-text-primary block">Autosave</span>
                    {savedAt ? (
                      <span className="text-[11px] text-success">Saved at {savedAt}</span>
                    ) : (
                      <span className="text-[11px] text-text-muted">Saving every 5s...</span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-text-muted mt-3">
                Your progress is saved automatically. You can resume if you refresh the page.
              </p>
            </CardContent>
          </Card>

          {/* Quick Navigation */}
          <Card className="rounded-[16px] border-border shadow-card">
            <CardContent className="p-5">
              <h3 className="text-[13px] font-semibold text-text-primary mb-3">Questions</h3>
              <div className="grid grid-cols-5 gap-2">
                {QUIZ_DATA.map((qq, i) => {
                  const isAnswered = (answers[qq.id] || []).length > 0;
                  const isSkipped = skipped.has(qq.id);
                  const isCurrent = i === currentQuestion;
                  return (
                    <button
                      key={qq.id}
                      onClick={() => setCurrentQuestion(i)}
                      className={cn(
                        "w-8 h-8 rounded-[8px] text-[12px] font-medium border transition-all",
                        isCurrent
                          ? "border-primary bg-primary text-white"
                          : isAnswered
                          ? "border-success/30 bg-success/10 text-success"
                          : isSkipped
                          ? "border-warning/30 bg-warning/10 text-warning"
                          : "border-border bg-white text-text-muted hover:bg-bg"
                      )}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface QuizResultsProps {
  scoreData: { correct: number; percentage: number; totalPoints: number; earnedPoints: number };
  passed: boolean;
  answeredCount: number;
  remainingCount: number;
  timeTaken: number;
  attempt: number;
  answers: Record<string, string[]>;
  onRetry: () => void;
  onReview: () => void;
  onNextLesson: () => void;
  onGoDashboard: () => void;
  topicStats: TopicPerformance[];
}

function QuizResults({
  scoreData,
  passed,
  answeredCount,
  timeTaken,
  attempt,
  answers,
  onRetry,
  onNextLesson,
  onGoDashboard,
  topicStats,
}: QuizResultsProps) {
  const incorrect = answeredCount - scoreData.correct;
  const skipped = QUIZ_DATA.length - answeredCount;
  const xpEarned = passed ? 150 + scoreData.earnedPoints : scoreData.earnedPoints;
  const grade = scoreData.percentage >= 90 ? "Excellent" : scoreData.percentage >= 80 ? "Good" : scoreData.percentage >= 50 ? "Average" : "Needs Improvement";

  const circleSize = 140;
  const stroke = 10;
  const r = (circleSize - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (scoreData.percentage / 100) * c;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Result Hero */}
      <Card className="rounded-[16px] border-border shadow-card overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            {/* Score Circle */}
            <div className="relative" style={{ width: circleSize, height: circleSize }}>
              <svg width={circleSize} height={circleSize} className="-rotate-90">
                <circle cx={circleSize / 2} cy={circleSize / 2} r={r} stroke="#E9E9EC" strokeWidth={stroke} fill="none" />
                <motion.circle
                  cx={circleSize / 2}
                  cy={circleSize / 2}
                  r={r}
                  stroke={passed ? "#22C55E" : "#F59E0B"}
                  strokeWidth={stroke}
                  fill="none"
                  strokeDasharray={`${dash} ${c - dash}`}
                  strokeLinecap="round"
                  initial={{ strokeDasharray: `0 ${c}` }}
                  animate={{ strokeDasharray: `${dash} ${c - dash}` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-text-primary">{scoreData.percentage}%</span>
                <span className="text-[12px] text-text-muted mt-1">Score</span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-text-primary mt-5">{grade}</h2>
            <div className="flex items-center gap-2 mt-2">
              {passed ? (
                <Badge className="bg-success/10 text-success border-0 rounded-full px-4 py-1.5 text-[13px] font-semibold">
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Passed
                </Badge>
              ) : (
                <Badge className="bg-danger/10 text-danger border-0 rounded-full px-4 py-1.5 text-[13px] font-semibold">
                  <XCircle className="w-4 h-4 mr-1" /> Failed
                </Badge>
              )}
              <span className="text-[12px] text-text-muted">Passing score: {PASSING_SCORE}%</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            <StatBox label="Answered" value={String(answeredCount)} icon={CheckCircle2} color="text-primary" />
            <StatBox label="Correct" value={String(scoreData.correct)} icon={CheckCircle2} color="text-success" />
            <StatBox label="Incorrect" value={String(incorrect)} icon={XCircle} color="text-danger" />
            <StatBox label="Skipped" value={String(skipped)} icon={SkipForward} color="text-warning" />
            <StatBox label="Time Taken" value={formatTime(timeTaken)} icon={Clock} color="text-text-secondary" />
            <StatBox label="Attempt" value={`#${attempt}`} icon={RotateCcw} color="text-text-secondary" />
            <StatBox label="Passing Score" value={`${PASSING_SCORE}%`} icon={Target} color="text-text-secondary" />
            <StatBox label="XP Earned" value={`+${xpEarned}`} icon={Zap} color="text-primary" />
          </div>
        </CardContent>
      </Card>

      {/* Achievement or Failed Message */}
      {passed ? (
        <Card className="rounded-[16px] border-success/20 shadow-card bg-success/[0.02]">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mb-3">
                <Trophy className="w-7 h-7 text-success" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">Congratulations!</h3>
              <p className="text-[14px] text-text-secondary mt-1">You passed this lesson.</p>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
                <div className="flex items-center gap-2 px-4 py-2 rounded-[12px] border border-border bg-white">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-[13px] font-semibold text-text-primary">{xpEarned} XP</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-[12px] border border-border bg-white">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-[13px] font-semibold text-text-primary">Lesson Badge</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-[12px] border border-border bg-white">
                  <Flame className="w-4 h-4 text-warning" />
                  <span className="text-[13px] font-semibold text-text-primary">5-Day Streak</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <Button onClick={onNextLesson} className="rounded-button h-10 px-5 text-[13px] font-medium">
                  Next Lesson <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button variant="outline" onClick={() => {}} className="rounded-button h-10 px-5 text-[13px] font-medium">
                  <BookOpen className="w-4 h-4 mr-1" /> Lesson Notes
                </Button>
                <Button variant="outline" onClick={() => {}} className="rounded-button h-10 px-5 text-[13px] font-medium">
                  <Award className="w-4 h-4 mr-1" /> Download Certificate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-[16px] border-warning/20 shadow-card bg-warning/[0.02]">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-warning/10 flex items-center justify-center mb-3">
                <BookOpen className="w-7 h-7 text-warning" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">Keep Learning.</h3>
              <p className="text-[14px] text-text-secondary mt-1">Review the lesson and try again.</p>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <Button onClick={onRetry} className="rounded-button h-10 px-5 text-[13px] font-medium">
                  <RotateCcw className="w-4 h-4 mr-1" /> Retry Quiz
                </Button>
                <Button variant="outline" onClick={() => {}} className="rounded-button h-10 px-5 text-[13px] font-medium">
                  <PlayCircle className="w-4 h-4 mr-1" /> Replay Video
                </Button>
                <Button variant="outline" onClick={() => {}} className="rounded-button h-10 px-5 text-[13px] font-medium">
                  <FileText className="w-4 h-4 mr-1" /> Read Notes
                </Button>
                <Button variant="outline" onClick={() => {}} className="rounded-button h-10 px-5 text-[13px] font-medium">
                  <Eye className="w-4 h-4 mr-1" /> View Incorrect Answers
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Analytics */}
      <Card className="rounded-[16px] border-border shadow-card">
        <CardContent className="p-6">
          <h3 className="text-[15px] font-semibold text-text-primary mb-1">Performance by Topic</h3>
          <p className="text-[12px] text-text-muted mb-5">See where you excel and where to improve.</p>
          <div className="space-y-4">
            {topicStats.map((stat) => (
              <div key={stat.topic}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <stat.icon className="w-3.5 h-3.5 text-text-muted" />
                    <span className="text-[13px] font-medium text-text-primary">{stat.topic}</span>
                  </div>
                  <span className={cn(
                    "text-[13px] font-bold",
                    stat.score >= 80 ? "text-success" : stat.score >= 50 ? "text-warning" : "text-danger"
                  )}>
                    {stat.score}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-border overflow-hidden">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      stat.score >= 80 ? "bg-success" : stat.score >= 50 ? "bg-warning" : "bg-danger"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Explanations */}
      <ExplanationSection questions={QUIZ_DATA} answers={answers} />

      {/* Footer actions */}
      <div className="flex items-center justify-center gap-3 pb-4">
        <Button variant="outline" onClick={onGoDashboard} className="rounded-button h-10 px-5 text-[13px] font-medium">
          Back to Dashboard
        </Button>
        {!passed && (
          <Button onClick={onRetry} className="rounded-button h-10 px-5 text-[13px] font-medium">
            <RotateCcw className="w-4 h-4 mr-1" /> Retry Quiz
          </Button>
        )}
        <Button variant="outline" onClick={() => {}} className="rounded-button h-10 px-5 text-[13px] font-medium">
          <Download className="w-4 h-4 mr-1" /> Download PDF
        </Button>
      </div>
    </div>
  );
}

function StatBox({ label, value, icon: Icon, color }: { label: string; value: string; icon: typeof CheckCircle2; color: string }) {
  return (
    <div className="rounded-[12px] border border-border p-4 bg-white">
      <Icon className={cn("w-4 h-4 mb-2", color)} />
      <div className="text-lg font-bold text-text-primary">{value}</div>
      <div className="text-[11px] text-text-muted">{label}</div>
    </div>
  );
}

function ExplanationSection({ questions, answers }: { questions: QuizQuestion[]; answers: Record<string, string[]> }) {
  return (
    <Card className="rounded-[16px] border-border shadow-card">
      <CardContent className="p-6">
        <h3 className="text-[15px] font-semibold text-text-primary mb-1">Explanations</h3>
        <p className="text-[12px] text-text-muted mb-5">Review each question with detailed explanations.</p>
        <div className="space-y-4">
          {questions.map((q, i) => {
            const selected = answers[q.id] || [];
            const correctIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
            const isCorrect = selected.length === correctIds.length && selected.length > 0 && selected.every((id) => correctIds.includes(id));
            const isSkipped = selected.length === 0;
            return (
              <div key={q.id} className={cn(
                "rounded-[12px] border p-4",
                isCorrect ? "border-success/20 bg-success/[0.02]" :
                isSkipped ? "border-warning/20 bg-warning/[0.02]" :
                "border-danger/20 bg-danger/[0.02]"
              )}>
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                    isCorrect ? "bg-success/10" : isSkipped ? "bg-warning/10" : "bg-danger/10"
                  )}>
                    {isCorrect ? <CheckCircle2 className="w-4 h-4 text-success" /> :
                     isSkipped ? <SkipForward className="w-4 h-4 text-warning" /> :
                     <XCircle className="w-4 h-4 text-danger" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[12px] font-medium text-text-muted">Q{i + 1}</span>
                      <Badge className="border-0 rounded-full px-2 py-0 text-[10px] bg-bg text-text-muted">{q.topic}</Badge>
                    </div>
                    <p className="text-[14px] font-medium text-text-primary mb-2">{q.question}</p>

                    {/* Show options with correct/incorrect states */}
                    <div className="space-y-1.5 mb-3">
                      {q.options.map((opt) => {
                        const isSel = selected.includes(opt.id);
                        const isAns = opt.isCorrect;
                        return (
                          <div key={opt.id} className={cn(
                            "flex items-center gap-2 text-[13px] px-3 py-2 rounded-[8px] border",
                            isAns ? "border-success/30 bg-success/5" :
                            isSel && !isAns ? "border-danger/30 bg-danger/5" :
                            "border-border"
                          )}>
                            {isAns ? <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" /> :
                             isSel ? <XCircle className="w-3.5 h-3.5 text-danger shrink-0" /> :
                             <div className="w-3.5 h-3.5 rounded-full border border-border shrink-0" />}
                            <span className={cn(
                              isAns ? "text-success font-medium" :
                              isSel ? "text-danger" : "text-text-secondary"
                            )}>
                              {opt.text}
                            </span>
                            {isSel && !isAns && <span className="text-[11px] text-danger ml-auto">Your answer</span>}
                            {isAns && <span className="text-[11px] text-success ml-auto">Correct</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="rounded-[8px] bg-bg p-3 mt-2">
                      <div className="text-[12px] font-semibold text-text-primary mb-1">Explanation</div>
                      <p className="text-[12px] text-text-secondary leading-relaxed">{q.explanation}</p>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      <button className="text-[12px] text-primary font-medium hover:underline">Read More</button>
                      <button className="text-[12px] text-text-muted hover:text-text-primary">Replay Lesson</button>
                      <button className="text-[12px] text-text-muted hover:text-text-primary">View Notes</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
