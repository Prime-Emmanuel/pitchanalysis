import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { FootballApiService } from "../services/FootballApiService";
import { Fixture } from "../types";

// Analysis steps
const ANALYSIS_STEPS = [
  "Loading fixture",
  "Retrieving historical matches",
  "Analyzing home performance",
  "Analyzing away performance",
  "Evaluating attacking efficiency",
  "Evaluating defensive stability",
  "Comparing historical meetings",
  "Calculating probabilities",
  "Generating confidence score",
];

export function MatchDetails() {
  const { id } = useParams<{ id: string }>();
  const [fixture, setFixture] = useState<Fixture | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Analysis state
  const [analysisPhase, setAnalysisPhase] = useState<
    "idle" | "loading" | "complete"
  >("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch fixture data
  useEffect(() => {
    async function loadMatch() {
      if (!id) return;
      try {
        setLoading(true);
        const data = await FootballApiService.getMatchDetails(id);
        setFixture(data);
        setError(null);
        // Start analysis loading after data is fetched
        setAnalysisPhase("loading");
        setCurrentStep(0);
        setProgress(0);
      } catch (err: any) {
        setError(err.message || "Failed to load match details");
        setAnalysisPhase("idle");
      } finally {
        setLoading(false);
      }
    }

    loadMatch();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [id]);

  // Handle analysis loading sequence
  useEffect(() => {
    if (analysisPhase !== "loading") return;

    const totalSteps = ANALYSIS_STEPS.length;
    const stepDuration = 250; // ms per step progress increment
    let stepIndex = 0;
    let progressValue = 0;

    intervalRef.current = setInterval(() => {
      progressValue += 100 / (totalSteps * 4); // ~4 ticks per step
      if (progressValue >= 100) {
        progressValue = 100;
        setProgress(100);
        setCurrentStep(totalSteps - 1);
        clearInterval(intervalRef.current!);
        setAnalysisPhase("complete");
        return;
      }

      const newStep = Math.floor((progressValue / 100) * totalSteps);
      if (newStep > stepIndex) {
        stepIndex = newStep;
        setCurrentStep(stepIndex);
      }
      setProgress(progressValue);
    }, stepDuration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [analysisPhase]);

  // If still loading fixture
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37] mb-4" />
        <p className="text-[#A1A1AA]">Loading match details...</p>
      </div>
    );
  }

  if (error || !fixture) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link
          to="/today"
          className="inline-flex items-center text-sm text-[#A1A1AA] hover:text-[#D4AF37] mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to matches
        </Link>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-500 mb-2">
            Error Loading Match
          </h3>
          <p className="text-sm text-red-400/90">
            {error || "Match not found"}
          </p>
        </div>
      </div>
    );
  }

  const matchDate = new Date(fixture.date);

  // Render analysis loading UI
  const renderAnalysisLoading = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Header with match info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={fixture.league.logo}
          alt={fixture.league.name}
          className="h-8 w-8 object-contain"
        />
        <div>
          <p className="text-sm text-[#A1A1AA]">{fixture.league.name}</p>
          <p className="text-sm text-[#A1A1AA]">
            {format(matchDate, "EEE, MMM d • HH:mm")}
          </p>
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between gap-6 py-4 border-t border-b border-[#222222]">
        <div className="flex flex-col items-center gap-2 flex-1">
          <img
            src={fixture.teams.home.logo}
            alt={fixture.teams.home.name}
            className="h-16 w-16 object-contain"
          />
          <span className="text-sm font-medium text-center">
            {fixture.teams.home.name}
          </span>
        </div>
        <div className="text-[#A1A1AA] text-sm font-medium">VS</div>
        <div className="flex flex-col items-center gap-2 flex-1">
          <img
            src={fixture.teams.away.logo}
            alt={fixture.teams.away.name}
            className="h-16 w-16 object-contain"
          />
          <span className="text-sm font-medium text-center">
            {fixture.teams.away.name}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-[#222222] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#D4AF37]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {ANALYSIS_STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center gap-3 text-sm ${
                isCompleted
                  ? "text-[#A1A1AA]"
                  : isActive
                  ? "text-white"
                  : "text-[#444444]"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-4 w-4 text-[#D4AF37]" />
              ) : isActive ? (
                <Loader2 className="h-4 w-4 animate-spin text-[#D4AF37]" />
              ) : (
                <Circle className="h-4 w-4 text-[#444444]" />
              )}
              <span className={isActive ? "font-medium" : ""}>{step}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );

  // Render prediction dashboard
  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header with match info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={fixture.league.logo}
          alt={fixture.league.name}
          className="h-8 w-8 object-contain"
        />
        <div>
          <p className="text-sm text-[#A1A1AA]">{fixture.league.name}</p>
          <p className="text-sm text-[#A1A1AA]">
            {format(matchDate, "EEE, MMM d • HH:mm")}
          </p>
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between gap-6 py-4 border-t border-b border-[#222222]">
        <div className="flex flex-col items-center gap-2 flex-1">
          <img
            src={fixture.teams.home.logo}
            alt={fixture.teams.home.name}
            className="h-16 w-16 object-contain"
          />
          <span className="text-sm font-medium text-center">
            {fixture.teams.home.name}
          </span>
        </div>
        <div className="text-[#A1A1AA] text-sm font-medium">VS</div>
        <div className="flex flex-col items-center gap-2 flex-1">
          <img
            src={fixture.teams.away.logo}
            alt={fixture.teams.away.name}
            className="h-16 w-16 object-contain"
          />
          <span className="text-sm font-medium text-center">
            {fixture.teams.away.name}
          </span>
        </div>
      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: "Winner Prediction", value: "—" },
          { title: "Goals Prediction", value: "—" },
          { title: "Corners Prediction", value: "—" },
          { title: "Cards Prediction", value: "—" },
          { title: "Confidence Score", value: "—" },
          { title: "AI Insight", value: "Coming Soon" },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#111111] border border-[#222222] rounded-xl p-5 hover:border-[#D4AF37]/30 transition-colors duration-300"
          >
            <h4 className="text-xs font-medium text-[#A1A1AA] uppercase tracking-wider mb-2">
              {item.title}
            </h4>
            <p className="text-xl font-display font-semibold text-white">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="text-center text-xs text-[#A1A1AA] pt-4 border-t border-[#222222]">
        Predictions are generated by our AI engine and will be available soon.
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        to="/today"
        className="inline-flex items-center text-sm text-[#A1A1AA] hover:text-[#D4AF37] mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to matches
      </Link>

      <div className="bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden shadow-sm p-6 md:p-8">
        <AnimatePresence mode="wait">
          {analysisPhase === "loading" && renderAnalysisLoading()}
          {analysisPhase === "complete" && renderDashboard()}
        </AnimatePresence>
      </div>
    </div>
  );
}
