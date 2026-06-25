import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, MapPin, Calendar as CalendarIcon, Clock, AlertCircle, Loader2 } from "lucide-react";
import { FootballApiService } from "../services/FootballApiService";
import { Fixture } from "../types";

export function MatchDetails() {
  const { id } = useParams<{ id: string }>();
  const [fixture, setFixture] = useState<Fixture | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMatch() {
      if (!id) return;
      try {
        setLoading(true);
        const data = await FootballApiService.getMatchDetails(id);
        setFixture(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load match details");
      } finally {
        setLoading(false);
      }
    }

    loadMatch();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-text-muted">Loading match details...</p>
      </div>
    );
  }

  if (error || !fixture) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link to="/today" className="inline-flex items-center text-sm text-text-muted hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to matches
        </Link>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-500 mb-2">Error Loading Match</h3>
          <p className="text-sm text-red-400/90">{error || "Match not found"}</p>
        </div>
      </div>
    );
  }

  const matchDate = new Date(fixture.date);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/today" className="inline-flex items-center text-sm text-text-muted hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to matches
      </Link>

      <div className="bg-surface border border-surface-hover rounded-2xl overflow-hidden shadow-sm">
        {/* Header - League Info */}
        <div className="bg-background/50 border-b border-surface-hover p-4 flex items-center justify-center gap-3">
          <img src={fixture.league.logo} alt={fixture.league.name} className="h-6 w-6 object-contain" />
          <span className="font-medium">{fixture.league.name}</span>
          <span className="text-text-muted text-sm">• {fixture.league.country}</span>
        </div>

        {/* Scoreboard */}
        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Home Team */}
          <div className="flex flex-col items-center gap-4 flex-1">
            <div className="h-24 w-24 bg-white/5 rounded-full flex items-center justify-center p-4">
              <img src={fixture.teams.home.logo} alt={fixture.teams.home.name} className="max-h-full max-w-full object-contain" />
            </div>
            <h2 className="text-xl font-bold text-center">{fixture.teams.home.name}</h2>
            <span className="text-sm font-medium text-text-muted bg-background/50 px-3 py-1 rounded-full">Home</span>
          </div>

          {/* Score / Status */}
          <div className="flex flex-col items-center justify-center gap-2 px-8">
            {fixture.status.short === "NS" ? (
              <div className="text-3xl font-mono font-bold text-text-muted">- : -</div>
            ) : (
              <div className="text-5xl font-mono font-bold flex items-center gap-4">
                <span>{fixture.goals.home !== null ? fixture.goals.home : "-"}</span>
                <span className="text-text-muted/30">-</span>
                <span>{fixture.goals.away !== null ? fixture.goals.away : "-"}</span>
              </div>
            )}
            <div className={`mt-4 px-4 py-1.5 rounded-full text-sm font-medium ${
              fixture.status.short === "FT" ? "bg-primary/10 text-primary border border-primary/20" :
              fixture.status.short === "NS" ? "bg-surface-hover text-text-muted" :
              "bg-green-500/10 text-green-500 border border-green-500/20 animate-pulse"
            }`}>
              {fixture.status.long}
            </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-4 flex-1">
            <div className="h-24 w-24 bg-white/5 rounded-full flex items-center justify-center p-4">
              <img src={fixture.teams.away.logo} alt={fixture.teams.away.name} className="max-h-full max-w-full object-contain" />
            </div>
            <h2 className="text-xl font-bold text-center">{fixture.teams.away.name}</h2>
            <span className="text-sm font-medium text-text-muted bg-background/50 px-3 py-1 rounded-full">Away</span>
          </div>

        </div>

        {/* Match Info Details */}
        <div className="bg-background/30 p-6 border-t border-surface-hover grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-sm text-text-muted">
            <CalendarIcon className="h-5 w-5 text-primary/70" />
            <span>{format(matchDate, "EEEE, MMMM do, yyyy")}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-text-muted">
            <Clock className="h-5 w-5 text-primary/70" />
            <span>{format(matchDate, "HH:mm")} (Local Time)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
