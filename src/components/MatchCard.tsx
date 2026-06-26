import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Fixture } from "../types";

export function MatchCard({ fixture }: { fixture: Fixture }) {
  const matchDate = new Date(fixture.date);

  return (
    <Link
      to={`/match/${fixture.id}`}
      className="block w-full bg-surface hover:bg-surface-hover transition-colors rounded-xl border border-surface-hover overflow-hidden"
    >
      <div className="p-4">

        {/* LEAGUE + STATUS */}
        <div className="flex justify-between items-center mb-4 text-xs text-text-muted font-medium">

          <div className="flex items-center gap-2">
            {fixture.league?.logo && (
              <img
                src={fixture.league.logo}
                alt={fixture.league?.name ?? "League"}
                className="w-4 h-4 object-contain"
              />
            )}
            <span>{fixture.league?.name ?? "Unknown League"}</span>
          </div>

          <div>
            {fixture.status?.short === "NS"
              ? format(matchDate, "HH:mm")
              : (
                <span className="text-primary">
                  {fixture.status?.short ?? "N/A"}
                </span>
              )}
          </div>

        </div>

        {/* TEAMS */}
        <div className="space-y-3">

          {/* HOME */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {fixture.teams?.home?.logo && (
                <img
                  src={fixture.teams.home.logo}
                  alt={fixture.teams?.home?.name ?? "Home team"}
                  className="w-6 h-6 object-contain"
                />
              )}
              <span className="font-semibold text-sm">
                {fixture.teams?.home?.name ?? "Unknown"}
              </span>
            </div>

            <span className="font-mono font-bold text-lg">
              {fixture.goals?.home ?? "-"}
            </span>
          </div>

          {/* AWAY */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {fixture.teams?.away?.logo && (
                <img
                  src={fixture.teams.away.logo}
                  alt={fixture.teams?.away?.name ?? "Away team"}
                  className="w-6 h-6 object-contain"
                />
              )}
              <span className="font-semibold text-sm">
                {fixture.teams?.away?.name ?? "Unknown"}
              </span>
            </div>

            <span className="font-mono font-bold text-lg">
              {fixture.goals?.away ?? "-"}
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
}
