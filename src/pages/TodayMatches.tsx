import { useEffect, useState } from "react";
import { format } from "date-fns";
import { FootballApiService } from "../services/FootballApiService";
import { Fixture } from "../types";
import { MatchCard } from "../components/MatchCard";
import { AlertCircle, Loader2 } from "lucide-react";

export function TodayMatches() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMatches() {
      try {
        setLoading(true);
        const data = await FootballApiService.getTodaysMatches();
        setFixtures(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load matches");
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, []);

  const today = new Date();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Today's Matches</h1>
          <p className="text-text-muted">{format(today, "EEEE, MMMM do, yyyy")}</p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-text-muted">Loading live fixtures...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center max-w-2xl mx-auto mt-10">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-500 mb-2">Connection Error</h3>
          <p className="text-sm text-red-400/90 mb-4">{error}</p>
          <div className="text-xs text-text-muted bg-background/50 p-4 rounded-lg text-left font-mono">
            Please ensure you have added your API-Football key to the .env file:<br />
            VITE_API_FOOTBALL_KEY="your_api_key_here"
          </div>
        </div>
      ) : fixtures.length === 0 ? (
        <div className="text-center py-20 bg-surface rounded-xl border border-surface-hover">
          <p className="text-text-muted">No matches scheduled for today.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fixtures.map((fixture) => (
            <MatchCard key={fixture.id} fixture={fixture} />
          ))}
        </div>
      )}
    </div>
  );
}
