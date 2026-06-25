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
        <div className="flex justify-between items-center mb-4 text-xs text-text-muted font-medium">
          <div className="flex items-center gap-2">
            <img src={fixture.league.logo} alt={fixture.league.name} className="w-4 h-4 object-contain" />
            <span>{fixture.league.name}</span>
          </div>
          <div>
            {fixture.status.short === "NS" 
              ? format(matchDate, "HH:mm") 
              : <span className="text-primary">{fixture.status.short}</span>}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={fixture.teams.home.logo} alt={fixture.teams.home.name} className="w-6 h-6 object-contain" />
              <span className="font-semibold text-sm">{fixture.teams.home.name}</span>
            </div>
            <span className="font-mono font-bold text-lg">
              {fixture.goals.home !== null ? fixture.goals.home : "-"}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={fixture.teams.away.logo} alt={fixture.teams.away.name} className="w-6 h-6 object-contain" />
              <span className="font-semibold text-sm">{fixture.teams.away.name}</span>
            </div>
            <span className="font-mono font-bold text-lg">
              {fixture.goals.away !== null ? fixture.goals.away : "-"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
